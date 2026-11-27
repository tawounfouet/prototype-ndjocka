import React from 'react';

const PalmSilhouette = ({ className = '' }) => (
  <svg viewBox="0 0 180 180" className={className} fill="none">
    <defs>
      <linearGradient id="palmGoldFade" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E6BC5F" stopOpacity="0.55" />
        <stop offset="65%" stopColor="#A67622" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#5C3E0E" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    {/* Tronc */}
    <path
      d="M95 178 C89 140, 86 105, 92 72 L100 72 C97 105, 102 140, 112 178 Z"
      fill="url(#palmGoldFade)"
    />
    {/* Palmes */}
    <path
      d="M94 74 C70 68, 45 78, 22 98 C40 72, 66 60, 92 64 C66 52, 42 52, 16 62 C38 42, 68 42, 94 56 C78 38, 60 25, 38 18 C65 18, 86 32, 98 52 C104 30, 120 14, 146 10 C128 24, 114 38, 104 56 C126 42, 152 40, 174 52 C148 52, 124 56, 104 66 C128 66, 152 76, 168 96 C146 82, 124 76, 100 74 Z"
      fill="url(#palmGoldFade)"
    />
    {/* Vagues dorées en bas */}
    <path
      d="M0 164 Q60 146 120 162 T180 156 L180 180 L0 180 Z"
      fill="url(#palmGoldFade)"
      opacity="0.45"
    />
  </svg>
);

export { PalmSilhouette };
