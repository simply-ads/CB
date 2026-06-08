"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Download } from "lucide-react";
import Image from "next/image";

interface MagazineViewerProps {
  /** Base path for page images, e.g. "/images/projects/vintage-travel-magazine/pages" */
  basePath: string;
  /** Total number of pages */
  pageCount: number;
  /** Label shown in the header bar */
  label: string;
  /** Optional download URL for the full PDF */
  downloadUrl?: string;
}

export default function MagazineViewer({ basePath, pageCount, label, downloadUrl }: MagazineViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNext = () => setCurrentPage((p) => Math.min(pageCount, p + 1));

  // Keyboard navigation
  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      else if (e.key === "ArrowRight") goToNext();
      else if (e.key === "Escape") setIsExpanded(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isExpanded, pageCount]);

  const pageFilename = (n: number) =>
    `${basePath}/page-${String(n).padStart(3, "0")}.jpg`;

  const header = (
    <div
      className={`flex items-center justify-between border-b border-[var(--rule)] ${
        isExpanded ? "px-8 py-4 bg-[var(--color-paper)]" : "px-6 py-3"
      }`}
    >
      <span className="fr-label text-[10px] uppercase tracking-[0.4em] text-[var(--color-azure)]">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {downloadUrl && (
          <a
            href={downloadUrl}
            download
            className="p-2 text-[var(--color-ink-3)] hover:text-[var(--color-azure)] transition-colors"
            aria-label="Download PDF"
          >
            <Download size={16} />
          </a>
        )}
        <div className="w-[1px] h-4 bg-[var(--rule)] mx-1" />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-[var(--color-ink-3)] hover:text-[var(--color-azure)] transition-colors"
          aria-label={isExpanded ? "Exit fullscreen" : "Fullscreen"}
        >
          {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </div>
  );

  const footer = (
    <div
      className={`flex items-center justify-center gap-6 border-t border-[var(--rule)] ${
        isExpanded ? "px-8 py-4 bg-[var(--color-paper)]" : "px-6 py-3"
      }`}
    >
      <button
        onClick={goToPrev}
        disabled={currentPage <= 1}
        className="p-2 text-[var(--color-ink-2)] hover:text-[var(--color-azure)] disabled:opacity-30 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="fr-label text-[10px] text-[var(--color-ink-2)] uppercase tracking-[0.3em]">
        {currentPage} <span className="opacity-40">of</span> {pageCount}
      </span>
      <button
        onClick={goToNext}
        disabled={currentPage >= pageCount}
        className="p-2 text-[var(--color-ink-2)] hover:text-[var(--color-azure)] disabled:opacity-30 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );

  const imageArea = (
    <div
      ref={containerRef}
      className={`overflow-auto bg-[var(--color-paper-2)] flex items-start justify-center ${
        isExpanded ? "flex-1" : "max-h-[80vh]"
      }`}
    >
      {/* Preload adjacent pages */}
      {[currentPage - 1, currentPage, currentPage + 1]
        .filter((n) => n >= 1 && n <= pageCount)
        .map((n) => (
          <img
            key={n}
            src={pageFilename(n)}
            alt={`${label} — page ${n}`}
            className={`max-w-full h-auto ${n === currentPage ? "block" : "hidden"}`}
            loading={n === currentPage ? "eager" : "lazy"}
            style={{ maxHeight: isExpanded ? "100vh" : "80vh", width: "auto" }}
          />
        ))}
    </div>
  );

  const viewer = (
    <>
      {header}
      {imageArea}
      {footer}
    </>
  );

  if (isExpanded) {
    return createPortal(
      <div className="fixed inset-0 z-[9999] bg-[var(--color-paper)] flex flex-col">
        {viewer}
      </div>,
      document.body
    );
  }

  return <div>{viewer}</div>;
}
