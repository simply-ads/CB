"use client";

import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";

interface MagazineViewerProps {
  basePath: string;
  pageCount: number;
  label: string;
  downloadUrl?: string;
}

export default function MagazineViewer({ basePath, pageCount, label, downloadUrl }: MagazineViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoom, setZoom] = useState(100);
  const scrollRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => setZoom((z) => Math.min(200, z + 25));
  const zoomOut = () => setZoom((z) => Math.max(50, z - 25));

  const pageFilename = useCallback(
    (n: number) => `${basePath}/page-${String(n).padStart(3, "0")}.png`,
    [basePath]
  );

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const header = (
    <div
      className={`flex items-center justify-between border-b border-[var(--rule)] ${
        isExpanded ? "px-8 py-4 bg-[var(--color-paper)]" : "px-6 py-3"
      }`}
    >
      <span className="fr-label text-[10px] uppercase tracking-[0.4em] text-[var(--color-azure)]">
        {label}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={zoomOut}
          disabled={zoom <= 50}
          className="p-2 text-[var(--color-ink-3)] hover:text-[var(--color-azure)] disabled:opacity-30 transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut size={16} />
        </button>
        <span className="fr-label text-[10px] text-[var(--color-ink-3)] w-12 text-center tracking-wider">
          {zoom}%
        </span>
        <button
          onClick={zoomIn}
          disabled={zoom >= 200}
          className="p-2 text-[var(--color-ink-3)] hover:text-[var(--color-azure)] disabled:opacity-30 transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn size={16} />
        </button>
        <div className="w-[1px] h-4 bg-[var(--rule)] mx-2" />
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

  const scrollArea = (
    <div
      ref={scrollRef}
      className={`overflow-auto bg-[var(--color-paper-2)] ${
        isExpanded ? "flex-1" : "max-h-[80vh]"
      }`}
    >
      <div
        className="flex flex-col items-center gap-2 py-6 px-4 mx-auto"
        style={{ width: `${zoom}%`, maxWidth: `${zoom}%` }}
      >
        {pages.map((n) => (
          <img
            key={n}
            src={pageFilename(n)}
            alt={`${label} — page ${n}`}
            className="w-full h-auto shadow-sm"
            loading={n <= 3 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>
    </div>
  );

  const viewer = (
    <>
      {header}
      {scrollArea}
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
