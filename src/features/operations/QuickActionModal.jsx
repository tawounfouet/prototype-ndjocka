import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const QuickActionModal = ({ modalType, onClose, onSubmit, members }) => {
  const [member, setMember] = useState('K. Martin');
  const [amount, setAmount] = useState('1000');

  if (!modalType) return null;

  const titles = {
    pret: 'Accorder un nouveau prêt',
    cotisation: 'Enregistrer une cotisation',
    remboursement: 'Saisir un remboursement'
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const numericAmount = parseInt(amount, 10);
    if (!numericAmount || numericAmount <= 0) return;
    onSubmit({ type: modalType, member, amount: numericAmount });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#FCF8F0] border border-[#D4A441]/60 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-5 py-3.5 bg-[#1B1611] text-[#F7E5B0] flex items-center justify-between">
          <h3 className="font-serif text-base font-bold">{titles[modalType]}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-[#E6C26E]"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#4E3F2A] mb-1">
              Membre concerné
            </label>
            <select
              value={member}
              onChange={(e) => setMember(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFC99D] text-sm text-[#22190E] focus:outline-none focus:border-[#B68122]"
            >
              {members.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#4E3F2A] mb-1">
              Montant (€)
            </label>
            <input
              type="number"
              min="10"
              step="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFC99D] text-sm text-[#22190E] font-semibold focus:outline-none focus:border-[#B68122]"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B5A42] hover:bg-[#EFE5D2]"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl gold-pill-active text-[#1B1408] text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Valider l&apos;opération</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { QuickActionModal };
