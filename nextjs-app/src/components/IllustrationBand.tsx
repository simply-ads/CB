const ICONS: Record<string, React.ReactNode> = {
  lemon: (
    <svg width="50" height="50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="46" cy="60" rx="30" ry="23" /><ellipse cx="46" cy="60" rx="22" ry="16" opacity="0.55" />
      <path d="M46 46 L 46 74 M30 60 L 62 60" opacity="0.45" /><path d="M52 38 Q 56 22 74 18 Q 70 30 60 40 Q 56 41 52 38 Z" /><path d="M64 26 q 6 1 9 6" opacity="0.5" />
    </svg>
  ),
  sailboat: (
    <svg width="50" height="50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="50" y1="10" x2="50" y2="70" /><path d="M50 14 L 28 66 L 50 66 Z" /><path d="M50 22 L 72 66 L 50 66 Z" /><path d="M34 52 L 50 52 M40 38 L 50 38" opacity="0.5" />
      <path d="M14 76 q 10 6 18 0 q 8 -6 18 0 q 10 6 18 0 q 8 -6 18 0" /><path d="M12 86 q 12 6 22 0 q 10 -6 22 0 q 10 6 22 0" opacity="0.55" />
    </svg>
  ),
  camel: (
    <svg width="58" height="50" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 80 Q 20 54 26 52 Q 33 50 36 56 Q 44 32 54 56 Q 62 40 72 54 Q 78 46 80 40 Q 84 32 92 32 L 96 26" /><path d="M90 30 q 5 -1 7 3" opacity="0.6" />
      <path d="M22 80 L 22 90 M38 70 L 38 90 M62 70 L 62 90 M80 62 L 80 90" /><path d="M8 92 L 100 92" opacity="0.45" /><circle cx="60" cy="14" r="6" opacity="0.5" />
    </svg>
  ),
  skyline: (
    <svg width="60" height="50" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 86 L 8 52 L 26 52 L 26 32 L 38 32 L 38 86" /><path d="M38 86 L 38 16 L 50 8 L 62 16 L 62 86" /><path d="M62 86 L 62 42 L 82 42 L 82 60 L 102 60 L 102 86" />
      <line x1="50" y1="8" x2="50" y2="2" /><path d="M14 60 L 20 60 M14 70 L 20 70 M44 28 L 56 28 M44 40 L 56 40 M44 52 L 56 52 M70 52 L 76 52 M88 70 L 96 70" opacity="0.5" />
    </svg>
  ),
  palm: (
    <svg width="48" height="50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M48 90 Q 44 62 47 40" /><path d="M47 40 q -3 4 -5 9 M47 52 q -3 3 -5 8" opacity="0.5" /><path d="M47 40 Q 28 28 12 34 Q 30 30 47 38" /><path d="M47 40 Q 67 26 87 32 Q 67 28 47 38" />
      <path d="M47 40 Q 38 20 24 12 Q 43 20 49 38" /><path d="M47 40 Q 57 20 73 14 Q 55 22 49 38" /><path d="M40 90 q 8 4 18 0" opacity="0.5" />
    </svg>
  ),
  balloon: (
    <svg width="46" height="52" viewBox="0 0 100 110" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 10 C 26 10 16 30 16 46 C 16 66 38 78 50 78 C 62 78 84 66 84 46 C 84 30 74 10 50 10 Z" />
      <path d="M50 10 C 40 30 40 60 50 78 M50 10 C 60 30 60 60 50 78 M30 16 C 26 38 30 62 42 76 M70 16 C 74 38 70 62 58 76" opacity="0.5" />
      <path d="M40 77 L 45 90 L 55 90 L 60 77" /><rect x="44" y="90" width="12" height="10" rx="1" /><path d="M44 95 L 56 95" opacity="0.5" />
    </svg>
  ),
  column: (
    <svg width="44" height="50" viewBox="0 0 90 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 26 L 76 26 M18 26 L 18 20 L 72 20 L 72 26" /><path d="M22 14 q 23 -8 46 0" opacity="0.55" /><path d="M28 26 L 28 80 M40 26 L 40 80 M52 26 L 52 80 M64 26 L 64 80" /><path d="M14 80 L 76 80 L 76 88 L 14 88 Z" />
    </svg>
  ),
  plane: (
    <svg width="58" height="50" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 54 L 108 42 Q 116 42 112 49 L 90 64 L 58 62 L 38 82 L 28 80 L 38 60 L 14 58 Z" /><path d="M70 50 L 96 47 M58 62 L 70 50" opacity="0.5" /><path d="M20 26 q 12 8 6 22" strokeDasharray="3 5" opacity="0.55" />
    </svg>
  ),
  pagoda: (
    <svg width="50" height="50" viewBox="0 0 110 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 34 Q 24 26 30 26 L 80 26 Q 86 26 88 34 Q 74 28 55 28 Q 36 28 22 34 Z" /><path d="M28 52 Q 30 44 36 44 L 74 44 Q 80 44 82 52 Q 70 46 55 46 Q 40 46 28 52 Z" />
      <path d="M34 70 Q 36 62 42 62 L 68 62 Q 74 62 76 70 Q 66 64 55 64 Q 44 64 34 70 Z" /><line x1="55" y1="64" x2="55" y2="88" /><path d="M44 88 L 66 88" /><line x1="55" y1="26" x2="55" y2="18" />
    </svg>
  ),
  ship: (
    <svg width="58" height="50" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 62 L 104 62 L 92 84 L 28 84 Z" /><path d="M34 62 L 34 42 L 80 42 L 80 62" /><rect x="42" y="48" width="8" height="9" rx="1" /><rect x="58" y="48" width="8" height="9" rx="1" />
      <line x1="62" y1="42" x2="62" y2="30" /><path d="M62 30 L 74 34 L 62 38 Z" /><path d="M8 74 q 12 7 22 0 q 10 -7 22 0 q 12 7 22 0 q 10 -7 22 0" opacity="0.55" />
    </svg>
  ),
  mountain: (
    <svg width="56" height="48" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 84 L 42 26 L 64 58 L 80 34 L 114 84 Z" /><path d="M34 38 L 42 26 L 50 38 Z" fill="currentColor" stroke="none" /><path d="M72 46 L 80 34 L 88 46" opacity="0.6" /><path d="M30 84 q 12 -8 24 0 q 12 8 24 0" opacity="0.4" />
    </svg>
  ),
  vespa: (
    <svg width="58" height="48" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="30" cy="74" r="12" /><circle cx="92" cy="74" r="12" /><path d="M30 74 L 50 74 Q 56 74 58 64 L 66 40 L 78 40" /><path d="M58 64 Q 70 60 80 64 Q 90 68 92 74" /><path d="M66 40 Q 64 30 74 28 L 84 28" /><path d="M50 74 Q 44 50 60 44" opacity="0.55" />
    </svg>
  ),
  teapot: (
    <svg width="52" height="48" viewBox="0 0 110 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 50 Q 30 76 55 76 Q 80 76 80 50 Z" /><path d="M30 50 L 80 50 Q 80 40 55 40 Q 30 40 30 50 Z" /><path d="M80 54 Q 96 54 94 70" /><path d="M30 56 Q 16 58 18 50 Q 20 44 30 48" />
      <path d="M48 40 Q 48 30 62 30 Q 70 30 70 36" opacity="0.7" /><line x1="55" y1="30" x2="55" y2="24" /><circle cx="55" cy="22" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  flamingo: (
    <svg width="42" height="52" viewBox="0 0 90 110" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 98 L 50 66 Q 50 44 64 40 Q 78 36 74 22 Q 71 13 60 16 Q 53 18 56 27" /><path d="M55 26 L 47 30" opacity="0.7" /><path d="M50 66 Q 34 60 26 74 Q 33 64 44 66" opacity="0.7" /><path d="M50 98 L 44 104 M50 98 L 56 104" />
    </svg>
  ),
};

const SEQUENCE: [string, React.ReactNode][] = [
  ["lemon", <>European villas</>],
  ["camel", <>Jordan day tours</>],
  ["skyline", <>New York walks</>],
  ["sailboat", <><em>Caribbean</em> sailing</>],
  ["pagoda", <>Japan adventures</>],
  ["mountain", <>Alpine escapes</>],
  ["palm", <>Island escapes</>],
  ["ship", <><em>Cruise</em> lines</>],
  ["balloon", <>Bucket-list trips</>],
  ["vespa", <>City escapes</>],
  ["column", <>Classical Europe</>],
  ["plane", <>Far-flung routes</>],
  ["teapot", <>Slow mornings</>],
  ["flamingo", <>Tropical tours</>],
];

export default function IllustrationBand() {
  const run = SEQUENCE.map(([icon, word], i) => (
    <span key={i} className="contents">
      {ICONS[icon]}
      <span className="word">{word}</span>
    </span>
  ));
  return (
    <div className="illus-band" aria-hidden>
      <div className="illus-track">
        {run}
        {run}
      </div>
    </div>
  );
}
