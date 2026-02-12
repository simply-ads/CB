"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="p-12 text-center text-charcoal/40">Loading document...</div>
  ),
});

export default function PdfViewerClient({ file, label }: { file: string; label: string }) {
  return <PdfViewer file={file} label={label} />;
}
