"use client";

import { useState } from "react";
import { Maximize2, Minimize2, Download } from "lucide-react";

interface PdfViewerProps {
  file: string;
  label: string;
}

export default function PdfViewer({ file, label }: PdfViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${isExpanded ? "fixed inset-0 z-50 bg-[var(--color-paper)] flex flex-col" : ""}`}>
      {/* Header bar */}
      <div
        className={`flex items-center justify-between border-b border-[var(--rule)] ${
          isExpanded ? "px-8 py-4" : "px-6 py-3"
        }`}
      >
        <span className="fr-label text-[10px] uppercase tracking-[0.4em] text-[var(--color-azure)]">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <a
            href={file}
            download
            className="p-2 text-[var(--color-ink-3)] hover:text-[var(--color-azure)] transition-colors"
            aria-label="Download PDF"
          >
            <Download size={16} />
          </a>
          <div className="w-[1px] h-4 bg-[var(--rule)] mx-1"></div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-[var(--color-ink-3)] hover:text-[var(--color-azure)] transition-colors"
            aria-label={isExpanded ? "Exit fullscreen" : "Fullscreen"}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* PDF embed */}
      <iframe
        src={`${file}#toolbar=0&navpanes=0`}
        title={label}
        className={`w-full border-0 bg-[var(--color-paper-2)] ${
          isExpanded ? "flex-1" : "h-[80vh]"
        }`}
      />
    </div>
  );
}
