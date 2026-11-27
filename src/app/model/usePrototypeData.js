import { useState } from 'react';
import { SAMPLE_MEMBERS, INITIAL_OPERATIONS, MOBILE_INITIAL_OPERATIONS } from '../../data/demoData';
import { formatEuro, formatEuroDecimal, formatPercentDecimal } from '../../shared/lib/money';

export function usePrototypeData() {
  // 'duo' (Desktop + Mobile côte à côte), 'desktop' (Admin plein écran), 'mobile' (Membre)
  const [viewMode, setViewMode] = useState('desktop');
  const [activeAdminTab, setActiveAdminTab] = useState('prets');
  const [members, setMembers] = useState(SAMPLE_MEMBERS);
  const [operations, setOperations] = useState(INITIAL_OPERATIONS);
  const [mobileOps, setMobileOps] = useState(MOBILE_INITIAL_OPERATIONS);
  const [modalType, setModalType] = useState(null);

  const handleAddMember = (newMember) => {
    setMembers((prev) => [newMember, ...prev]);
  };

  const handleUpdateMember = (updatedMember) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
  };

  const handleCreateLoan = ({
    member,
    amount,
    rate,
    date,
    monthlyInterest
  }) => {
    // 1. Ajouter dans les dernières opérations (et dans l'espace membre si K. Martin)
    handleAddOperation({ type: 'pret', member: member.name, amount });

    // 2. Mettre à jour la fiche du membre (nb prêts, encours, intérêt mensuel et activité)
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== member.id) return m;
        return {
          ...m,
          pretsCount: m.pretsCount + 1,
          pretsMontantTotal: (m.pretsMontantTotal || 0) + amount,
          interetMensuel: (m.interetMensuel || 0) + monthlyInterest,
          prets: formatEuro((m.pretsMontantTotal || 0) + amount),
          activites: [
            {
              date,
              text: `Création d'un prêt de ${formatEuroDecimal(amount)} (${formatPercentDecimal(rate)}).`,
              active: true
            },
            ...(m.activites || []).map((a) => ({ ...a, active: false }))
          ]
        };
      })
    );
  };

  const handleAddOperation = ({ type, member, amount }) => {
    const newOp = {
      id: Date.now(),
      date: '26 nov. 2026',
      type,
      label:
        type === 'pret'
          ? 'Prêt accordé'
          : type === 'cotisation'
          ? 'Cotisation'
          : 'Remboursement',
      member,
      amount,
      amountDisplay: formatEuro(amount),
      amountTone: type === 'pret' ? 'red' : 'green',
      status: type === 'pret' ? 'Validé' : 'Enregistré',
      statusTone: type === 'pret' ? 'green' : 'amber'
    };

    setOperations((prev) => [newOp, ...prev]);

    if (member === 'K. Martin') {
      setMobileOps((prev) => [
        {
          id: `m-${Date.now()}`,
          type,
          label: newOp.label,
          date: newOp.date,
          amount: newOp.amountDisplay,
          tone: 'green'
        },
        ...prev
      ]);
    }
  };

  return { viewMode, setViewMode, activeAdminTab, setActiveAdminTab, members, operations, mobileOps,
    modalType, setModalType, handleAddMember, handleUpdateMember, handleCreateLoan, handleAddOperation };
}
