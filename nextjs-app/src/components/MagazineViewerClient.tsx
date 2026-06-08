"use client";

import dynamic from "next/dynamic";

const MagazineViewer = dynamic(() => import("@/components/MagazineViewer"), {
  ssr: false,
  loading: () => (
    <div className="p-12 text-center text-[var(--color-ink-3)]">Loading viewer…</div>
  ),
});

interface MagazineViewerClientProps {
  basePath: string;
  pageCount: number;
  label: string;
  downloadUrl?: string;
}

export default function MagazineViewerClient(props: MagazineViewerClientProps) {
  return <MagazineViewer {...props} />;
}
