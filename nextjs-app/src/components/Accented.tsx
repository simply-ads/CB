import React from "react";

/**
 * Renders `text`, wrapping the first occurrence of `accent` in an <em>
 * (azure register in the .d2 theme). If accent is empty or not found,
 * the plain text is returned.
 */
export default function Accented({ text, accent }: { text: string; accent?: string | null }) {
  if (!accent) return <>{text}</>;
  const idx = text.indexOf(accent);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <em>{accent}</em>
      {text.slice(idx + accent.length)}
    </>
  );
}
