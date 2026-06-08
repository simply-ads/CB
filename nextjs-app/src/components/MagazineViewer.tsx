"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

  // Capture vertical wheel events and convert to horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Only hijack if there's horizontal overflow to scroll
      if (el.scrollWidth <= el.clientWidth) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoom, isExpanded]);

  // Escape key for fullscreen
  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isExpanded]);

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
      className={`overflow-x-auto overflow-y-hidden bg-[var(--color-paper-2)] ${
        isExpanded ? "flex-1" : ""
      }`}
      style={{ height: isExpanded ? undefined : "75vh" }}
    >
      <div
        className="flex items-start gap-3 h-full py-4 px-4"
        style={{ width: "max-content" }}
      >
        {pages.map((n) => (
          <img
            key={n}
            src={pageFilename(n)}
            alt={`${label} — page ${n}`}
            className="h-full w-auto flex-shrink-0 shadow-sm"
            loading={n <= 6 ? "eager" : "lazy"}
            decoding="async"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
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
