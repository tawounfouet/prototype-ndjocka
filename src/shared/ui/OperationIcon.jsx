import React from 'react';
import { Coins, HandCoins, RefreshCw, AlertTriangle } from 'lucide-react';

const OperationIcon = ({ type }) => {
  switch (type) {
    case 'pret':
      return <HandCoins className="w-4 h-4 text-[#8A611C] shrink-0" />;
    case 'cotisation':
      return <Coins className="w-4 h-4 text-[#B07E24] shrink-0" />;
    case 'remboursement':
      return <RefreshCw className="w-4 h-4 text-[#7D5718] shrink-0" />;
    case 'sanction':
      return <AlertTriangle className="w-4 h-4 text-[#C53030] shrink-0" />;
    default:
      return <Coins className="w-4 h-4 text-[#B07E24] shrink-0" />;
  }
};

export { OperationIcon };
