/**
 * Convert PDF pages to JPEG images using Puppeteer + pdf.js.
 * Uses addScriptTag to reliably load pdf.js from CDN.
 *
 * Usage:  node scripts/pdf-to-images.mjs <input.pdf> <output-dir>
 */
import puppeteer from "puppeteer";
import { mkdirSync, statSync, readFileSync } from "fs";
import { resolve, join } from "path";

const [, , pdfPath, outDir] = process.argv;
if (!pdfPath || !outDir) {
  console.error("Usage: node scripts/pdf-to-images.mjs <input.pdf> <output-dir>");
  process.exit(1);
}

const absPath = resolve(pdfPath);
mkdirSync(outDir, { recursive: true });

const RENDER_WIDTH = 1600;
const PDFJS_VERSION = "4.9.155";
const PDFJS_CDN = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// Start with a blank page with a canvas
await page.setContent(`<!DOCTYPE html>
<html><body style="margin:0;background:white"><canvas id="c"></canvas></body></html>`, {
  waitUntil: "domcontentloaded"
});

// Load pdf.js via script tag (works reliably with CDN)
await page.addScriptTag({ url: `${PDFJS_CDN}/pdf.min.mjs`, type: "module" });

// Small delay for module to register
await new Promise(r => setTimeout(r, 2000));

// Load the PDF data as base64 and pass to browser context
const pdfData = readFileSync(absPath);
const base64 = pdfData.toString("base64");
console.log(`PDF loaded (${Math.round(pdfData.length / 1024 / 1024)} MB). Initializing pdf.js…`);

// Initialize pdf.js and load document in browser
const numPages = await page.evaluate(async (b64, cdnUrl) => {
  // pdf.js from CDN module should be available on globalThis.pdfjsLib
  // If not, try window
  const pdfjsLib = globalThis.pdfjsLib || window.pdfjsLib;
  if (!pdfjsLib) throw new Error("pdf.js not loaded");
  
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${cdnUrl}/pdf.worker.min.mjs`;
  
  // Convert base64 to Uint8Array
  const raw = atob(b64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  
  const doc = await pdfjsLib.getDocument({ data: arr }).promise;
  window.__pdfDoc = doc;
  return doc.numPages;
}, base64, PDFJS_CDN);

console.log(`PDF has ${numPages} pages. Rendering at ${RENDER_WIDTH}px wide…\n`);

// Render each page
for (let i = 1; i <= numPages; i++) {
  const dims = await page.evaluate(async (pageNum, renderWidth) => {
    const doc = window.__pdfDoc;
    const page = await doc.getPage(pageNum);
    const vp = page.getViewport({ scale: 1 });
    const scale = renderWidth / vp.width;
    const viewport = page.getViewport({ scale });
    
    const canvas = document.getElementById("c");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    await page.render({ canvasContext: ctx, viewport }).promise;
    return { width: Math.round(viewport.width), height: Math.round(viewport.height) };
  }, i, RENDER_WIDTH);

  await page.setViewport({ width: dims.width, height: dims.height, deviceScaleFactor: 1 });

  const canvas = await page.$("#c");
  const filename = `page-${String(i).padStart(3, "0")}.png`;
  await canvas.screenshot({ path: join(outDir, filename), type: "png" });

  const size = statSync(join(outDir, filename)).size;
  console.log(`  ✓ ${filename}  (${Math.round(size / 1024)} KB)`);
}

await browser.close();
console.log(`\nDone — ${numPages} images written to ${outDir}`);
