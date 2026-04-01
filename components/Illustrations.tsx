type SVGProps = { className?: string; style?: React.CSSProperties };

export function SeedlingIllustration({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      {/* Floating dandelion seed — far left */}
      <ellipse cx="30" cy="82" rx="2" ry="4.5" fill="#D4C4B0" opacity="0.55" transform="rotate(-18 30 82)" />
      <path d="M30 78 C28 73 23 70 19 69" stroke="#C4B4A0" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Floating seed — mid left */}
      <ellipse cx="48" cy="108" rx="1.6" ry="3.8" fill="#D4C4B0" opacity="0.45" transform="rotate(12 48 108)" />
      {/* Floating seed — far right */}
      <ellipse cx="162" cy="96" rx="1.8" ry="4" fill="#D4C4B0" opacity="0.5" transform="rotate(22 162 96)" />
      <path d="M162 92 C164 87 168 85 173 84" stroke="#C4B4A0" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.35" />
      {/* Floating seed — near right */}
      <ellipse cx="155" cy="120" rx="1.4" ry="3.2" fill="#D4C4B0" opacity="0.4" transform="rotate(-8 155 120)" />

      {/* Pot body — trapezoid */}
      <path d="M63 158 L137 158 L124 198 L76 198 Z" fill="#C07B5E" />
      {/* Pot shading */}
      <path d="M76 198 L124 198 C120 198 116 196 113 194 L84 194 C81 196 78 198 76 198Z" fill="#A8694E" opacity="0.35" />
      {/* Pot rim */}
      <rect x="58" y="150" width="84" height="13" rx="6.5" fill="#D4896A" />
      {/* Rim highlight */}
      <rect x="62" y="151" width="76" height="4" rx="3" fill="#E0A080" opacity="0.4" />

      {/* Soil */}
      <ellipse cx="100" cy="154" rx="39" ry="7" fill="#3A2416" />
      {/* Soil texture dots */}
      <circle cx="82" cy="152" r="1.8" fill="#6B4C35" opacity="0.5" />
      <circle cx="94" cy="154.5" r="1.4" fill="#5A3C28" opacity="0.45" />
      <circle cx="108" cy="153" r="1.6" fill="#6B4C35" opacity="0.5" />
      <circle cx="120" cy="155" r="1.3" fill="#5A3C28" opacity="0.4" />

      {/* Main stem */}
      <path d="M100 148 C99 138 101 126 99 115 C97 104 100 96 100 86" stroke="#4A6D4C" strokeWidth="2.8" strokeLinecap="round" fill="none" />

      {/* Left leaf */}
      <path d="M100 122 C87 107 66 112 68 129 C70 142 88 141 100 122Z" fill="#72A876" />
      <path d="M100 122 C88 116 72 120 68 129" stroke="#4A6D4C" strokeWidth="0.85" strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M90 118 C85 122 82 127 83 131" stroke="#4A6D4C" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.3" />

      {/* Right leaf */}
      <path d="M100 108 C113 93 134 98 131 115 C128 128 110 127 100 108Z" fill="#5A8C5E" />
      <path d="M100 108 C111 102 128 105 131 115" stroke="#4A6D4C" strokeWidth="0.85" strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M112 103 C116 108 118 114 116 118" stroke="#4A6D4C" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.3" />

      {/* Upper stem to bud */}
      <path d="M100 86 C100 86 99 75 100 62" stroke="#4A6D4C" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* Young bud */}
      <path d="M100 62 C100 62 92 52 95 43 C97 36 105 36 107 43 C110 52 100 62 100 62Z" fill="#8FC492" />
      <path d="M100 62 C100 54 100 44 100 38" stroke="#5A8A5C" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.45" />
      <path d="M97 48 C97 44 99 40 101 38" stroke="#B0D8B2" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />

      {/* Small grass blades left */}
      <path d="M78 148 C76 142 77 136 79 132" stroke="#5A8C5E" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M83 147 C82 141 84 135 87 132" stroke="#6A9B6E" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Small grass blades right */}
      <path d="M122 147 C123 141 122 135 120 132" stroke="#5A8C5E" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M117 148 C119 142 118 136 115 133" stroke="#6A9B6E" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function BloomIllustration({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <path
          key={angle}
          d="M50 50 C47 37 48 26 50 18 C52 26 53 37 50 50Z"
          fill={i % 2 === 0 ? "#E8C4B0" : "#D4AE9A"}
          transform={`rotate(${angle} 50 50)`}
          opacity="0.9"
        />
      ))}
      <circle cx="50" cy="50" r="11" fill="#E8B87A" />
      <circle cx="50" cy="50" r="6.5" fill="#F0C882" />
      <circle cx="48" cy="48" r="1.2" fill="#C8944A" opacity="0.5" />
      <circle cx="52" cy="49" r="1" fill="#C8944A" opacity="0.4" />
      <circle cx="50" cy="52" r="1.1" fill="#C8944A" opacity="0.45" />
    </svg>
  );
}

export function LeafSprig({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path d="M16 34 C16 34 4 24 5 14 C6 5 16 2 16 2 C16 2 26 5 27 14 C28 24 16 34 16 34Z" fill="currentColor" />
      <path d="M16 34 C16 34 16 16 16 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
      <path d="M16 22 C13 18 10 16 8 16" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      <path d="M16 16 C19 12 22 11 24 11" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function WavyLine({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 320 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path
        d="M0 10 C30 3 60 17 90 10 C120 3 150 17 180 10 C210 3 240 17 270 10 C290 5 310 14 320 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
