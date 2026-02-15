"use client";

import { useState, useCallback, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfViewerProps {
  file: string;
  label: string;
}

export default function PdfViewer({ file, label }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [spread, setSpread] = useState(1); // left page of the current spread
  const [scale, setScale] = useState(1.0);
  const [isExpanded, setIsExpanded] = useState(false);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

  // For spreads: page 1 is always shown alone (cover), then 2-3, 4-5, etc.
  const leftPage = spread;
  const rightPage = spread === 1 ? null : spread + 1 <= numPages ? spread + 1 : null;
  const isSpread = leftPage !== 1 && rightPage !== null;

  const goToPrev = () => {
    setSpread((s) => {
      if (s === 1) return 1;
      if (s === 2) return 1; // go back to cover
      return s - 2; // go back one spread
    });
  };

  const goToNext = () => {
    setSpread((s) => {
      if (s === 1) return 2; // cover -> first spread
      const next = s + 2;
      if (next > numPages) return s; // already at end
      return next;
    });
  };

  const isAtStart = spread === 1;
  const isAtEnd = spread === 1 ? numPages <= 1 : spread + 2 > numPages;

  const zoomIn = () => setScale((s) => Math.min(2.0, s + 0.25));
  const zoomOut = () => setScale((s) => Math.max(0.5, s - 0.25));

  // Display label for current pages
  const pageLabel = useMemo(() => {
    if (numPages === 0) return "";
    if (spread === 1) return `1 of ${numPages}`;
    if (rightPage) return `${leftPage}\u2013${rightPage} of ${numPages}`;
    return `${leftPage} of ${numPages}`;
  }, [spread, leftPage, rightPage, numPages]);

  // Memoize the file prop so Document doesn't re-mount on state changes
  const fileOption = useMemo(() => file, [file]);

  return (
    <div className={`${isExpanded ? "fixed inset-0 z-50 bg-cream/95 backdrop-blur-sm flex flex-col" : ""}`}>
      {/* Header bar */}
      <div
        className={`flex items-center justify-between border-b border-charcoal/10 ${
          isExpanded ? "px-8 py-4" : "px-6 py-3 mb-1"
        }`}
      >
        <span className="text-[11px] uppercase tracking-[0.1em] font-bold text-terracotta">
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
          <span className="text-[11px] font-bold text-charcoal/40 w-12 text-center tracking-wider">
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
          isExpanded ? "flex-1" : ""
        }`}
      >
        <div className={`flex justify-center py-8 px-4 ${isExpanded ? "min-h-0" : ""}`}>
          <Document
            file={fileOption}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center py-24">
                <span className="text-sm text-charcoal/40 uppercase tracking-[0.1em] font-bold">
                  Loading&hellip;
                </span>
              </div>
            }
            error={
              <div className="flex items-center justify-center py-24">
                <span className="text-sm text-charcoal/40 uppercase tracking-[0.1em] font-bold">
                  Unable to load document
                </span>
              </div>
            }
          >
            <div className={`flex ${isSpread ? "gap-1" : ""} items-start`}>
              <Page
                key={`page-${leftPage}`}
                pageNumber={leftPage}
                scale={scale}
                className="shadow-xl"
                renderAnnotationLayer
                renderTextLayer
              />
              {rightPage && (
                <Page
                  key={`page-${rightPage}`}
                  pageNumber={rightPage}
                  scale={scale}
                  className="shadow-xl"
                  renderAnnotationLayer
                  renderTextLayer
                />
              )}
            </div>
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
            disabled={isAtStart}
            className="p-2 text-charcoal/60 hover:text-terracotta disabled:opacity-30 transition-colors"
            aria-label="Previous spread"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-[11px] font-bold text-charcoal/60 uppercase tracking-[0.1em]">
            {pageLabel}
          </span>
          <button
            onClick={goToNext}
            disabled={isAtEnd}
            className="p-2 text-charcoal/60 hover:text-terracotta disabled:opacity-30 transition-colors"
            aria-label="Next spread"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
