import React from 'react';
import { formatEuro } from "../../shared/lib/money";

const CustomCaisseTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1C1712] border border-[#D4A441]/50 text-[#FBF6EA] px-3 py-2 rounded-lg shadow-xl text-xs">
        <p className="text-[#E6C26E] font-semibold mb-0.5">{label} 2026</p>
        <p className="font-bold text-sm">{formatEuro(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export { CustomCaisseTooltip };
