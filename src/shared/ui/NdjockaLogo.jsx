import React from 'react';

const NdjockaLogo = ({ size = 'md', showPalmLeft = false }) => {
  const dimensions = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-12 h-12' : 'w-11 h-11';
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {showPalmLeft && (
        <svg viewBox="0 0 36 48" className="w-6 h-8 opacity-90 shrink-0" fill="none">
          <defs>
            <linearGradient id="goldPalmSmall" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F8DE8D" />
              <stop offset="55%" stopColor="#D4A23E" />
              <stop offset="100%" stopColor="#8E6218" />
            </linearGradient>
          </defs>
          <path
            d="M19 46 C18 36, 17 28, 19 20 C14 21, 9 23, 5 27 C8 20, 12 17, 17 16 C11 14, 7 14, 3 16 C7 11, 13 10, 18 13 C15 8, 13 5, 10 3 C16 4, 20 8, 21 12 C23 7, 27 4, 32 4 C28 7, 25 10, 23 14 C28 13, 32 14, 35 17 C30 17, 26 18, 22 19 C26 22, 29 25, 31 29 C26 25, 23 23, 21 21 C20 29, 21 37, 23 46 Z"
            fill="url(#goldPalmSmall)"
          />
        </svg>
      )}
      <svg viewBox="0 0 64 64" className={`${dimensions} shrink-0`} fill="none">
        <defs>
          <linearGradient id="goldLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCE79C" />
            <stop offset="45%" stopColor="#D9A73E" />
            <stop offset="100%" stopColor="#946719" />
          </linearGradient>
        </defs>
        {/* Couronne */}
        <path
          d="M20 18 L23 9 L29 14 L32 6 L35 14 L41 9 L44 18 Z"
          fill="url(#goldLogoGrad)"
        />
        <rect x="20" y="19.5" width="24" height="2.2" rx="1" fill="url(#goldLogoGrad)" />
        <circle cx="32" cy="5.5" r="1.5" fill="#FCE79C" />
        <circle cx="22.5" cy="8.5" r="1.2" fill="#FCE79C" />
        <circle cx="41.5" cy="8.5" r="1.2" fill="#FCE79C" />
        {/* Monogramme ND */}
        <text
          x="32"
          y="50"
          textAnchor="middle"
          fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
          fontWeight="700"
          fontSize="31"
          letterSpacing="-3"
          fill="url(#goldLogoGrad)"
        >
          ND
        </text>
      </svg>
    </div>
  );
};

export { NdjockaLogo };
