"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  file: string;
  label: string;
}

export default function PdfViewer({ file, label }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isExpanded, setIsExpanded] = useState(false);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

  const goToPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goToNext = () => setPageNumber((p) => Math.min(numPages, p + 1));
  const zoomIn = () => setScale((s) => Math.min(2.0, s + 0.25));
  const zoomOut = () => setScale((s) => Math.max(0.5, s - 0.25));

  return (
    <div className={`${isExpanded ? "fixed inset-0 z-50 bg-cream flex flex-col" : ""}`}>
      {/* Header bar */}
      <div
        className={`flex items-center justify-between border-b border-charcoal/10 ${
          isExpanded ? "px-8 py-4" : "px-6 py-3 mb-1"
        }`}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-terracotta">
          {label}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="p-2 text-charcoal/60 hover:text-terracotta disabled:opacity-30 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-[10px] font-bold text-charcoal/40 w-12 text-center tracking-wider">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={scale >= 2.0}
            className="p-2 text-charcoal/60 hover:text-terracotta disabled:opacity-30 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
          <div className="w-[1px] h-4 bg-charcoal/10 mx-2"></div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-charcoal/60 hover:text-terracotta transition-colors"
            aria-label={isExpanded ? "Exit fullscreen" : "Fullscreen"}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* PDF content */}
      <div
        className={`overflow-auto bg-charcoal/[0.03] ${
          isExpanded ? "flex-1" : "max-h-[80vh]"
        }`}
      >
        <div className="flex justify-center py-8 px-4">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{
              cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
              cMapPacked: true,
              standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
            }}
            loading={
              <div className="flex items-center justify-center py-24">
                <span className="text-sm text-charcoal/40 uppercase tracking-[0.3em] font-bold">
                  Loading&hellip;
                </span>
              </div>
            }
            error={
              <div className="flex items-center justify-center py-24">
                <span className="text-sm text-charcoal/40 uppercase tracking-[0.3em] font-bold">
                  Unable to load document
                </span>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="border border-charcoal/10"
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </div>
      </div>

      {/* Footer navigation */}
      {numPages > 0 && (
        <div
          className={`flex items-center justify-center gap-6 border-t border-charcoal/10 ${
            isExpanded ? "px-8 py-4" : "px-6 py-3 mt-1"
          }`}
        >
          <button
            onClick={goToPrev}
            disabled={pageNumber <= 1}
            className="p-2 text-charcoal/60 hover:text-terracotta disabled:opacity-30 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-[10px] font-bold text-charcoal/60 uppercase tracking-[0.3em]">
            {pageNumber} <span className="text-charcoal/30">of</span> {numPages}
          </span>
          <button
            onClick={goToNext}
            disabled={pageNumber >= numPages}
            className="p-2 text-charcoal/60 hover:text-terracotta disabled:opacity-30 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
