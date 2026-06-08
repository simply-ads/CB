/**
 * Convert PDF pages to JPEG images using Puppeteer (headless Chrome).
 * Chrome handles all PDF image formats natively — including JPEG2000.
 *
 * Usage:  node scripts/pdf-to-images-puppeteer.mjs <input.pdf> <output-dir>
 */
import puppeteer from "puppeteer";
import { mkdirSync, statSync } from "fs";
import { resolve, join } from "path";

const [, , pdfPath, outDir] = process.argv;
if (!pdfPath || !outDir) {
  console.error("Usage: node scripts/pdf-to-images-puppeteer.mjs <input.pdf> <output-dir>");
  process.exit(1);
}

const absPath = resolve(pdfPath);
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// Load the PDF in Chrome's built-in viewer
const fileUrl = `file:///${absPath.replace(/\\/g, "/")}`;
await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 60000 });

// Wait for Chrome's PDF viewer to load, then get page count
// Chrome renders PDFs in a shadow DOM plugin — we need to use CDP to get page info
const client = await page.createCDPSession();

// Use pdfjs via Chrome to count pages — evaluate in the PDF viewer context
// Alternative: parse the PDF ourselves just for the page count
const { default: pdfjsLib } = await import("pdfjs-dist/legacy/build/pdf.mjs");
const { readFileSync } = await import("fs");
const data = new Uint8Array(readFileSync(absPath));
const doc = await pdfjsLib.getDocument({ data }).promise;
const numPages = doc.numPages;

// Get first page dimensions to set viewport
const firstPage = await doc.getPage(1);
const vp = firstPage.getViewport({ scale: 1 });
const aspectRatio = vp.width / vp.height;
await doc.destroy();

// Render width — 1600px gives sharp results
const RENDER_WIDTH = 1600;
const RENDER_HEIGHT = Math.round(RENDER_WIDTH / aspectRatio);

console.log(`PDF has ${numPages} pages (${Math.round(vp.width)}×${Math.round(vp.height)})`);
console.log(`Rendering at ${RENDER_WIDTH}×${RENDER_HEIGHT}px …\n`);

await browser.close();

// Use a fresh approach: render each page individually using pdfjs + canvas
// Since pdfjs failed on JPEG2000, let's use a simple HTML page approach with Puppeteer
const browser2 = await puppeteer.launch({ headless: true });

for (let i = 1; i <= numPages; i++) {
  const pg = await browser2.newPage();
  await pg.setViewport({ width: RENDER_WIDTH, height: RENDER_HEIGHT, deviceScaleFactor: 1 });

  // Create an HTML page that uses an embedded PDF viewer pointing to a specific page
  // Use pdf.js from CDN to render in browser context (Chrome's canvas handles JPEG2000)
  const html = `
    <!DOCTYPE html>
    <html><head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.9.155/pdf.min.mjs" type="module"></script>
      <style>* { margin: 0; padding: 0; } body { background: white; overflow: hidden; }</style>
    </head><body>
      <canvas id="canvas"></canvas>
      <script type="module">
        const pdfjsLib = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.9.155/pdf.min.mjs");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.9.155/pdf.worker.min.mjs";
        const doc = await pdfjsLib.getDocument("${fileUrl}").promise;
        const page = await doc.getPage(${i});
        const vp = page.getViewport({ scale: 1 });
        const scale = ${RENDER_WIDTH} / vp.width;
        const viewport = page.getViewport({ scale });
        const canvas = document.getElementById("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
        window.__done = true;
      </script>
    </body></html>
  `;

  await pg.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });
  // Wait for rendering
  await pg.waitForFunction("window.__done === true", { timeout: 30000 });

  const canvas = await pg.$("#canvas");
  const filename = `page-${String(i).padStart(3, "0")}.jpg`;
  await canvas.screenshot({ path: join(outDir, filename), type: "jpeg", quality: 85 });

  const size = statSync(join(outDir, filename)).size;
  console.log(`  ✓ ${filename}  (${Math.round(size / 1024)} KB)`);

  await pg.close();
}

await browser2.close();
console.log(`\nDone — ${numPages} images written to ${outDir}`);
