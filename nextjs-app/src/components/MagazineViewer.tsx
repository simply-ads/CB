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
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => setZoom((z) => Math.min(200, z + 25));
  const zoomOut = () => setZoom((z) => Math.max(50, z - 25));

  const pageFilename = useCallback(
    (n: number) => `${basePath}/page-${String(n).padStart(3, "0")}.png`,
    [basePath]
  );

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  // Horizontal scroll driven by vertical scroll position
  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!outer || !track || !sticky) return;

    const onScroll = () => {
      const outerRect = outer.getBoundingClientRect();
      const stickyHeight = sticky.clientHeight;
      const scrollableDistance = outer.clientHeight - stickyHeight;

      if (scrollableDistance <= 0) return;

      // How far through the scroll region are we (0 to 1)
      const progress = Math.max(0, Math.min(1, -outerRect.top / scrollableDistance));

      // How far the track needs to move
      const trackWidth = track.scrollWidth;
      const viewWidth = sticky.clientWidth;
      const maxTranslate = trackWidth - viewWidth;

      if (maxTranslate <= 0) return;

      track.style.transform = `translateX(${-progress * maxTranslate}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial position
    return () => window.removeEventListener("scroll", onScroll);
  }, [pageCount, zoom]);

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

  /* ===== Fullscreen mode: simple vertical scroll ===== */
  if (isExpanded) {
    return createPortal(
      <div className="fixed inset-0 z-[9999] bg-[var(--color-paper)] flex flex-col">
        {header}
        <div className="flex-1 overflow-auto bg-[var(--color-paper-2)]">
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
      </div>,
      document.body
    );
  }

  /* ===== Inline mode: horizontal scroll driven by vertical scroll ===== */
  // The outer div is tall — enough vertical space to scroll through all pages.
  // The sticky container pins the viewer in view while the scroll drives horizontal movement.
  const scrollHeight = `${pageCount * 60}vh`;

  return (
    <div ref={outerRef} style={{ height: scrollHeight, position: "relative" }}>
      <div
        ref={stickyRef}
        className="sticky top-0"
        style={{ height: "80vh", overflow: "hidden" }}
      >
        {header}
        <div
          className="bg-[var(--color-paper-2)]"
          style={{ height: "calc(100% - 45px)", overflow: "hidden" }}
        >
          <div
            ref={trackRef}
            className="flex items-start gap-3 h-full py-4 px-4"
            style={{
              willChange: "transform",
              transition: "transform 0.05s linear",
            }}
          >
            {pages.map((n) => (
              <img
                key={n}
                src={pageFilename(n)}
                alt={`${label} — page ${n}`}
                className="h-full w-auto flex-shrink-0 shadow-sm"
                loading={n <= 6 ? "eager" : "lazy"}
                decoding="async"
                style={{ zoom: `${zoom}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
