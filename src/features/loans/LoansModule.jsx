import React, { useState, useMemo } from 'react';
import { Home, Users, Coins, HandCoins, BarChart3, Hourglass, Plus, Eye, ArrowRight, CheckCircle2, X, Search, Check, Calendar, Pencil, ArrowLeft, ChevronRight, Percent, Info, Shield, ArrowLeftRight, GitBranch } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatEuro, formatEuroDecimal, formatPercentDecimal } from "../../shared/lib/money";
import { buildLoanSchedule } from "./lib/loanCalculations";

const LoansModule = ({ members, onCreateLoan, onGoToDashboard }) => {
  // 'detail' (UI-05) | 'create' (UI-04)
  const [loanView, setLoanView] = useState('detail');

  // Liste des prêts enregistrés (pré-remplie avec le prêt de K. Martin de la maquette UI-05)
  const [loansList, setLoansList] = useState([
    {
      id: 'P-001',
      memberId: 'M-001',
      memberName: 'K. Martin',
      memberInitials: 'KM',
      amount: 1000,
      rate: 5,
      date: '26 nov. 2026',
      durationMonths: 12,
      status: 'Prêt actif'
    },
    {
      id: 'P-002',
      memberId: 'M-003',
      memberName: 'P. Djoum',
      memberInitials: 'PD',
      amount: 2500,
      rate: 5,
      date: '18 nov. 2026',
      durationMonths: 12,
      status: 'Prêt actif'
    },
    {
      id: 'P-003',
      memberId: 'M-005',
      memberName: 'Y. Ouedraogo',
      memberInitials: 'YO',
      amount: 1500,
      rate: 5,
      date: '12 nov. 2026',
      durationMonths: 12,
      status: 'Prêt actif'
    }
  ]);

  // États UI-05 (Détail & Projection)
  const [selectedLoanId, setSelectedLoanId] = useState('P-001');
  const [projectionMonths, setProjectionMonths] = useState(12);
  const [showAllScheduleRows, setShowAllScheduleRows] = useState(false);

  // États UI-04 (Création 3 étapes)
  const [currentStep, setCurrentStep] = useState(1); // 1: Membre, 2: Détails, 3: Récapitulatif
  const [memberSearch, setMemberSearch] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || 'M-001');
  const [amountInput, setAmountInput] = useState('1000');
  const [monthlyRate, setMonthlyRate] = useState(5);
  const [loanDate, setLoanDate] = useState('26 nov. 2026');
  const [durationMonths, setDurationMonths] = useState(12);
  const [savedNotice, setSavedNotice] = useState(null);

  const activeLoan = useMemo(
    () => loansList.find((l) => l.id === selectedLoanId) || loansList[0],
    [loansList, selectedLoanId]
  );

  const detailSchedule = useMemo(
    () => buildLoanSchedule(activeLoan.amount, activeLoan.rate, projectionMonths),
    [activeLoan, projectionMonths]
  );

  const detailMonthlyInterest = (activeLoan.amount * activeLoan.rate) / 100;
  const detailTotalInterests = detailMonthlyInterest * projectionMonths;
  const detailProjectedTotal = activeLoan.amount + detailTotalInterests;

  const selectedMember = useMemo(
    () => members.find((m) => m.id === selectedMemberId) || members[0],
    [members, selectedMemberId]
  );

  const filteredMembers = useMemo(() => {
    if (!memberSearch.trim()) return members;
    const q = memberSearch.toLowerCase();
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        (m.phone && m.phone.toLowerCase().includes(q))
    );
  }, [members, memberSearch]);

  // Calculs financiers en temps réel (intérêts simples mensuels - UI-04)
  const numericAmount = useMemo(() => {
    const cleaned = String(amountInput).replace(/\s/g, '').replace(',', '.');
    const parsed = parseFloat(cleaned);
    return Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [amountInput]);

  const monthlyInterest = useMemo(
    () => (numericAmount * Number(monthlyRate)) / 100,
    [numericAmount, monthlyRate]
  );

  const totalInterests = useMemo(
    () => monthlyInterest * Number(durationMonths),
    [monthlyInterest, durationMonths]
  );

  const projectedTotal = useMemo(
    () => numericAmount + totalInterests,
    [numericAmount, totalInterests]
  );

  const handleRegisterLoan = () => {
    if (!selectedMember || numericAmount <= 0 || !Number.isFinite(Number(monthlyRate)) || Number(monthlyRate) < 0 || !Number.isInteger(Number(durationMonths)) || Number(durationMonths) < 1) return;

    const newLoanObj = {
      id: `P-00${loansList.length + 1}`,
      memberId: selectedMember.id,
      memberName: selectedMember.name,
      memberInitials: selectedMember.initials,
      amount: numericAmount,
      rate: Number(monthlyRate),
      date: loanDate,
      durationMonths: Number(durationMonths),
      status: 'Prêt actif'
    };

    setLoansList((prev) => [newLoanObj, ...prev]);
    setSelectedLoanId(newLoanObj.id);
    setProjectionMonths(Number(durationMonths));

    onCreateLoan({
      member: selectedMember,
      amount: numericAmount,
      rate: Number(monthlyRate),
      date: loanDate,
      durationMonths: Number(durationMonths),
      monthlyInterest,
      totalInterests,
      projectedTotal
    });

    setSavedNotice({
      memberName: selectedMember.name,
      memberId: selectedMember.id,
      amount: numericAmount,
      projectedTotal
    });
    setCurrentStep(3);
  };

  const steps = [
    { num: 1, label: 'Membre' },
    { num: 2, label: 'Détails' },
    { num: 3, label: 'Récapitulatif' }
  ];

  const pocRules = [
    'Taux mensuel configurable (ex. : 5,00 %).',
    'Calcul des intérêts simples (mensuels).',
    "Génération d'un échéancier prévisionnel.",
    'Pas de remboursements (hors périmètre POC).',
    "Historique et consultation dans l'espace membre."
  ];

  // ========================================================================
  // SOUS-VUE UI-05 : DÉTAIL DU PRÊT ET PROJECTION DES INTÉRÊTS
  // ========================================================================
  if (loanView === 'detail') {
    const visibleScheduleRows =
      showAllScheduleRows || detailSchedule.length <= 5
        ? detailSchedule
        : [...detailSchedule.slice(0, 4)];
    const lastScheduleRow = detailSchedule[detailSchedule.length - 1];

    return (
      <div className="space-y-4">
        {/* En-tête Espace Prêt + Switcher UI-04 / UI-05 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F0D388] via-[#CFA042] to-[#9B6D1D] flex items-center justify-center shadow-sm shrink-0 border border-[#E5C169]">
              <Coins className="w-6 h-6 text-[#231808]" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1F170C] leading-tight">
                Espace Prêt
              </h2>
              <p className="text-xs text-[#6B5A42]">
                Consultation, suivi et projection des prêts
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Sélecteur rapide de prêt enregistré */}
            <select
              value={selectedLoanId}
              onChange={(e) => {
                const chosen = loansList.find((l) => l.id === e.target.value);
                setSelectedLoanId(e.target.value);
                if (chosen) setProjectionMonths(chosen.durationMonths);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#FDFBF6] border border-[#DFC99D] text-xs font-semibold text-[#2B2012] focus:outline-none focus:border-[#B68122]"
            >
              {loansList.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.memberName} ({l.memberId}) - {formatEuro(l.amount)}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                setSavedNotice(null);
                setCurrentStep(1);
                setLoanView('create');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#B88524] via-[#9D6D17] to-[#7D530E] text-[#FFF9EC] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-110 transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Nouveau prêt (UI-04)</span>
            </button>
          </div>
        </div>

        {/* Fil d'Ariane */}
        <div className="flex items-center gap-1.5 text-xs text-[#6B5A42]">
          <button
            type="button"
            onClick={onGoToDashboard}
            className="inline-flex items-center gap-1 hover:text-[#1F170C] transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#8A621B]" />
            <span>Accueil</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#A59274]" />
          <span>Prêts</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#A59274]" />
          <span className="font-bold text-[#1F170C]">
            Détail du prêt et projection des intérêts
          </span>
        </div>

        {/* Bandeau sombre doré UI-05 */}
        <div className="rounded-xl px-4 py-2.5 bg-gradient-to-r from-[#1A130B] via-[#342411] to-[#1A130B] border border-[#D4A441]/55 shadow-sm flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full border border-[#E5BC5E]/70 bg-[#2C1F0E] text-[#FCE392] text-xs font-bold tracking-wide">
              UI-05
            </span>
            <span className="h-4 w-px bg-[#D4A441]/40" />
            <h3 className="text-sm sm:text-[15px] font-bold text-[#FFF6DF]">
              Détail du prêt et projection des intérêts
            </h3>
          </div>
          <span className="text-[11px] font-medium text-[#E6C26E] hidden sm:inline">
            POC • Module Prêts
          </span>
        </div>

        {/* Grille 2 colonnes : Détail du prêt (4 cols) + Échéancier prévisionnel agrandi (8 cols) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          {/* COLONNE 1 : Détail du prêt (4 cols) */}
          <div className="xl:col-span-4 bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <Coins className="w-5 h-5 text-[#A4741E]" />
              <h4 className="text-[16px] font-bold text-[#1F170C]">Détail du prêt</h4>
            </div>

            {/* Carte Membre + Badge Prêt actif */}
            <div className="p-3 rounded-xl bg-[#FAF4E8] border border-[#E8D8B9] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C89A3F] to-[#7D5718] flex items-center justify-center text-[#FFF6DC] font-serif font-bold text-xs shrink-0 shadow-xs">
                  {activeLoan.memberInitials}
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-sm font-bold text-[#1F170C] truncate">
                    {activeLoan.memberName}
                  </div>
                  <div className="text-[11px] text-[#736045]">
                    N° {activeLoan.memberId}
                  </div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DCF5E3] border border-[#AEE2BE] text-[#176B33] text-[11px] font-bold shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1D8A42]" />
                <span>{activeLoan.status}</span>
              </span>
            </div>

            {/* Liste détaillée des paramètres du prêt */}
            <div className="divide-y divide-[#F0E6D2] text-[13px]">
              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[#5C4C35]">
                  <Coins className="w-4 h-4 text-[#9B7228]" />
                  Montant du prêt :
                </span>
                <span className="px-3 py-0.5 rounded-lg bg-[#F9E7B6] border border-[#E4C272] font-bold text-[#2B1D07]">
                  {formatEuroDecimal(activeLoan.amount)}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[#5C4C35]">
                  <Percent className="w-4 h-4 text-[#9B7228]" />
                  Taux mensuel :
                </span>
                <span className="font-bold text-[#1F170C]">
                  {formatPercentDecimal(activeLoan.rate)}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[#5C4C35]">
                  <Calendar className="w-4 h-4 text-[#9B7228]" />
                  Date du prêt :
                </span>
                <span className="font-bold text-[#1F170C]">{activeLoan.date}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[#5C4C35]">
                  <Hourglass className="w-4 h-4 text-[#9B7228]" />
                  Durée de projection :
                </span>
                <span className="font-bold text-[#1F170C]">{projectionMonths} mois</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[#5C4C35]">
                  <Coins className="w-4 h-4 text-[#9B7228]" />
                  Intérêt mensuel :
                </span>
                <span className="font-bold text-[#1F170C]">
                  {formatEuroDecimal(detailMonthlyInterest)}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[#5C4C35]">
                  <span className="w-4 text-center font-serif font-bold text-[#9B7228]">
                    Σ
                  </span>
                  Intérêts totaux projetés :
                </span>
                <span className="font-bold text-[#1F170C]">
                  {formatEuroDecimal(detailTotalInterests)}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 font-semibold text-[#1F170C]">
                  <Coins className="w-4 h-4 text-[#9B7228]" />
                  Montant total projeté :
                </span>
                <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#F9E6AD] to-[#F1CF79] border border-[#D4A441] font-bold text-[#2B1D07] shadow-2xs">
                  {formatEuroDecimal(detailProjectedTotal)}
                </span>
              </div>
            </div>

            {/* Encadré bleu d'information */}
            <div className="rounded-xl bg-[#EDF3FC] border border-[#C6D9F5] p-3 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <p className="text-xs italic text-[#254570] leading-snug">
                Projection calculée à intérêts simples sur capital constant.
              </p>
            </div>
          </div>

          {/* COLONNE 2 : Échéancier prévisionnel + Cumul des intérêts (8 cols) */}
          <div className="xl:col-span-8 bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#A4741E]" />
              <h4 className="text-[16px] font-bold text-[#1F170C]">
                Échéancier prévisionnel
              </h4>
            </div>

            {/* Sélecteur durée de projection */}
            <div className="relative">
              <Calendar className="w-4 h-4 text-[#8C7756] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={projectionMonths}
                onChange={(e) => {
                  setProjectionMonths(Number(e.target.value));
                  setShowAllScheduleRows(false);
                }}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF6EE] border border-[#DFC99D] text-xs sm:text-[13px] font-semibold text-[#22190E] focus:outline-none focus:border-[#B68122]"
              >
                <option value={3}>Projection sur 3 mois</option>
                <option value={6}>Projection sur 6 mois</option>
                <option value={12}>Projection sur 12 mois</option>
                <option value={18}>Projection sur 18 mois</option>
                <option value={24}>Projection sur 24 mois</option>
              </select>
            </div>

            {/* Tableau de l'échéancier */}
            <div className="rounded-xl overflow-hidden border border-[#E8D8B9]">
              <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
                <thead>
                  <tr className="bg-[#F6E8C3] text-[#4C3816] font-bold">
                    <th className="py-2 px-3">Mois</th>
                    <th className="py-2 px-3 text-right">
                      Intérêt ({activeLoan.rate} %)
                    </th>
                    <th className="py-2 px-3 text-right">Cumul intérêts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E6D2] bg-[#FFFDF9]">
                  {visibleScheduleRows.map((row) => (
                    <tr key={row.index} className="hover:bg-[#FAF4E8] transition-colors">
                      <td className="py-2 px-3 font-semibold text-[#241B10]">
                        {row.label}
                      </td>
                      <td className="py-2 px-3 text-right text-[#4C3D28]">
                        {formatEuroDecimal(row.interest)}
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-[#241B10]">
                        {formatEuroDecimal(row.cumul)}
                      </td>
                    </tr>
                  ))}

                  {/* Ligne de suspension cliquable pour déplier/replier */}
                  {detailSchedule.length > 5 && (
                    <tr className="bg-[#FAF6EE]">
                      <td colSpan={3} className="py-1.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => setShowAllScheduleRows(!showAllScheduleRows)}
                          className="text-xs font-bold text-[#8E6214] hover:underline"
                        >
                          {showAllScheduleRows
                            ? '▲ Réduire les mois intermédiaires'
                            : `... (${detailSchedule.length - 5} autres mois - cliquer pour tout afficher)`}
                        </button>
                      </td>
                    </tr>
                  )}

                  {/* Dernière échéance mise en évidence (or) */}
                  {!showAllScheduleRows && detailSchedule.length > 5 && lastScheduleRow && (
                    <tr className="bg-gradient-to-r from-[#F9E6AF] via-[#F6DC93] to-[#F9E6AF] font-bold text-[#2B1D07]">
                      <td className="py-2.5 px-3">{lastScheduleRow.label}</td>
                      <td className="py-2.5 px-3 text-right">
                        {formatEuroDecimal(lastScheduleRow.interest)}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {formatEuroDecimal(lastScheduleRow.cumul)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Graphique Cumul des intérêts */}
            <div className="pt-1 space-y-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#A4741E]" />
                <h5 className="text-sm font-bold text-[#1F170C]">Cumul des intérêts</h5>
              </div>

              <div className="w-full h-[215px] bg-[#FFFDF9] border border-[#EFE3CB] rounded-xl p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={detailSchedule}
                    margin={{ top: 10, right: 12, left: -4, bottom: 4 }}
                  >
                    <defs>
                      <linearGradient id="cumulBarGold" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E6B64B" />
                        <stop offset="100%" stopColor="#9C6A14" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#EFE5D2"
                    />
                    <XAxis
                      dataKey="label"
                      axisLine={{ stroke: '#DFCFAF' }}
                      tickLine={false}
                      interval={projectionMonths > 18 ? 2 : projectionMonths > 12 ? 1 : 0}
                      tick={{ fill: '#5F4E37', fontSize: 10.5 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#5F4E37', fontSize: 10.5 }}
                      tickFormatter={(v) => `${v} €`}
                    />
                    <Tooltip
                      formatter={(val) => [formatEuroDecimal(val), 'Cumul intérêts']}
                      contentStyle={{
                        backgroundColor: '#1C1712',
                        borderColor: '#D4A441',
                        borderRadius: '8px',
                        color: '#FBF6EA',
                        fontSize: '12px'
                      }}
                    />
                    <Bar
                      dataKey="cumul"
                      fill="url(#cumulBarGold)"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={28}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================================
  // SOUS-VUE UI-04 : CRÉATION D'UN PRÊT EN 3 ÉTAPES
  // ========================================================================
  return (
    <div className="space-y-4">
      {/* En-tête du module Nouveau prêt */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F0D388] via-[#CFA042] to-[#9B6D1D] flex items-center justify-center shadow-sm shrink-0 border border-[#E5C169]">
            <Coins className="w-6 h-6 text-[#231808]" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1F170C] leading-tight">
              Nouveau prêt
            </h2>
            <p className="text-xs text-[#6B5A42]">
              Création et enregistrement d&apos;un prêt pour un membre
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLoanView('detail')}
            className="px-3.5 py-1.5 rounded-xl bg-[#FDFBF6] border border-[#DFC99D] text-xs font-semibold text-[#4C3D28] hover:bg-[#EFE4CE] flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#8A611C]" />
            <span>Détail &amp; projection (UI-05)</span>
          </button>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C160F] border border-[#D4A441]/55 text-[#F6DA8B] text-[11px] font-semibold">
            <HandCoins className="w-3.5 h-3.5" />
            UI-04 • Parcours en 3 étapes
          </span>
        </div>
      </div>

      {/* Message de confirmation après enregistrement */}
      {savedNotice && (
        <div className="rounded-xl bg-[#ECF9F0] border border-[#9ADBB0] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#175B2E] shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#1D7A3C] shrink-0" />
            <div>
              <span className="font-bold">Prêt enregistré avec succès !</span>{' '}
              {formatEuroDecimal(savedNotice.amount)} accordés à{' '}
              <span className="font-bold">
                {savedNotice.memberName} ({savedNotice.memberId})
              </span>{' '}
              - Montant total projeté :{' '}
              <span className="font-bold">{formatEuroDecimal(savedNotice.projectedTotal)}</span>.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLoanView('detail')}
              className="px-3 py-1 rounded-lg bg-[#9E6E1E] text-white font-semibold hover:brightness-110 transition-all"
            >
              Voir l&apos;échéancier (UI-05)
            </button>
            <button
              onClick={onGoToDashboard}
              className="px-3 py-1 rounded-lg bg-[#1D7A3C] text-white font-semibold hover:brightness-110 transition-all"
            >
              Voir le tableau de bord
            </button>
            <button
              onClick={() => setSavedNotice(null)}
              className="p-1 rounded-md hover:bg-[#D5F2DF] text-[#175B2E]"
              aria-label="Fermer la notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Disposition principale : Zone 3 étapes à gauche + Panneaux d'aide à droite */}
      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-4 items-start">
        {/* Colonne principale (Stepper + 3 cartes + Barre d'actions) */}
        <div className="2xl:col-span-9 space-y-4">
          {/* Barre Stepper 1 - 2 - 3 */}
          <div className="bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl px-6 py-4 shadow-xs">
            <div className="max-w-2xl mx-auto flex items-center justify-between relative">
              {/* Ligne de fond reliant les 3 étapes */}
              <div className="absolute top-4 left-8 right-8 h-[2px] bg-[#E2D3B5] z-0" />
              <div
                className="absolute top-4 left-8 h-[2px] bg-gradient-to-r from-[#B88524] to-[#D9A73E] z-0 transition-all duration-300"
                style={{
                  width: currentStep === 1 ? '0%' : currentStep === 2 ? '45%' : 'calc(100% - 4rem)'
                }}
              />

              {steps.map((step) => {
                const isActive = currentStep === step.num;
                const isCompleted = currentStep > step.num;
                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setCurrentStep(step.num)}
                    className="relative z-10 flex flex-col items-center gap-1.5 group focus:outline-none"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-gradient-to-br from-[#D9A73E] to-[#8C5E14] text-white shadow-md ring-4 ring-[#F4E3B8]'
                          : isCompleted
                          ? 'bg-[#9E6E1E] text-[#FFF8EA] shadow-xs'
                          : 'bg-[#FFFDF8] border-2 border-[#D4C3A3] text-[#6B5A42] group-hover:border-[#B68122]'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.num}
                    </div>
                    <span
                      className={`text-xs font-semibold transition-colors ${
                        isActive
                          ? 'text-[#1F170C] font-bold'
                          : isCompleted
                          ? 'text-[#8E6214]'
                          : 'text-[#7D6A4E]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contenu de l'étape active (une seule étape affichée en pleine largeur) */}
          {currentStep === 1 && (
            <div className="bg-[#FDFBF6] rounded-2xl p-5 sm:p-6 shadow-xs border border-[#E4D3B2] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-[15px] font-bold text-[#1F170C]">
                    Étape 1 - Sélection du membre <span className="text-[#C53030]">*</span>
                  </h3>
                  <p className="text-xs text-[#736045]">
                    Choisissez le membre bénéficiaire du prêt dans la liste ci-dessous.
                  </p>
                </div>

                {/* Recherche membre */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#8C7756] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    placeholder="Rechercher un membre (nom, téléphone, ...)"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FAF6EE] border border-[#DFC99D] text-[#241B10] placeholder-[#9B8869] focus:outline-none focus:border-[#B68122]"
                  />
                </div>
              </div>

              {/* Grille des membres */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredMembers.length === 0 ? (
                  <div className="md:col-span-2 text-center py-8 text-xs text-[#7D6A4E]">
                    Aucun membre trouvé.
                  </div>
                ) : (
                  filteredMembers.map((m) => {
                    const isSelected = m.id === selectedMember?.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMemberId(m.id)}
                        className={`w-full px-3.5 py-3 rounded-xl border flex items-center justify-between gap-3 text-left transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#FAF0D7] to-[#F4E1B2] border-[#CFA042] shadow-xs ring-1 ring-[#D9A73E]/50'
                            : 'bg-[#FFFDF9] border-[#EBE0CA] hover:bg-[#FAF4E8]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C89A3F] to-[#7D5718] flex items-center justify-center text-[#FFF6DC] font-serif font-bold text-xs shrink-0">
                            {m.initials}
                          </div>
                          <div className="min-w-0 leading-tight">
                            <div className="text-sm font-bold text-[#22190E] truncate">
                              {m.name}
                            </div>
                            <div className="text-[11px] text-[#736045] mt-0.5">
                              N° {m.id} • {m.phonePrefix} {m.phone}
                            </div>
                          </div>
                        </div>

                        {/* Bouton radio personnalisé */}
                        <span
                          className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#8E6214]' : 'border-[#CBBBA0]'
                          }`}
                        >
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#8E6214]" />
                          )}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-[#FDFBF6] rounded-2xl p-5 sm:p-6 shadow-xs border border-[#E4D3B2] space-y-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#1F170C]">
                  Étape 2 - Détails du prêt
                </h3>
                <p className="text-xs text-[#736045]">
                  Renseignez le montant, le taux mensuel, la date et la durée de projection.
                </p>
              </div>

              {/* Carte Membre sélectionné */}
              {selectedMember && (
                <div className="p-3 rounded-xl bg-[#F8F0DF] border border-[#E4CFA3] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C89A3F] to-[#7D5718] flex items-center justify-center text-[#FFF6DC] font-serif font-bold text-xs shrink-0">
                      {selectedMember.initials}
                    </div>
                    <div className="leading-tight min-w-0">
                      <div className="text-[11px] text-[#7D6A4E]">Membre sélectionné</div>
                      <div className="text-sm font-bold text-[#22190E] truncate">
                        {selectedMember.name} (N° {selectedMember.id})
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-3 py-1.5 rounded-lg bg-[#F3DFB2] hover:bg-[#EAD093] border border-[#D4AF5F] text-xs font-semibold text-[#5C3E0B] flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Changer</span>
                  </button>
                </div>
              )}

              {/* Champs du prêt sur 2 colonnes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Montant du prêt */}
                <div>
                  <label className="block text-xs font-semibold text-[#4C3D28] mb-1.5">
                    Montant du prêt <span className="text-[#C53030]">*</span>
                  </label>
                  <div className="relative">
                    <Coins className="w-4 h-4 text-[#9B6D1D] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="50"
                      step="50"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      className="w-full pl-9 pr-12 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#DFC99D] text-sm font-bold text-[#22190E] focus:outline-none focus:border-[#B68122]"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B5A42]">
                      €
                    </span>
                  </div>
                </div>

                {/* Taux d'intérêt mensuel */}
                <div>
                  <label className="block text-xs font-semibold text-[#4C3D28] mb-1.5">
                    Taux d&apos;intérêt mensuel <span className="text-[#C53030]">*</span>
                  </label>
                  <div className="relative">
                    <Percent className="w-4 h-4 text-[#9B6D1D] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={monthlyRate}
                      onChange={(e) => setMonthlyRate(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#DFC99D] text-sm font-bold text-[#22190E] focus:outline-none focus:border-[#B68122]"
                    >
                      <option value={2.5}>2,50 %</option>
                      <option value={3}>3,00 %</option>
                      <option value={4}>4,00 %</option>
                      <option value={5}>5,00 %</option>
                      <option value={7.5}>7,50 %</option>
                      <option value={10}>10,00 %</option>
                    </select>
                  </div>
                </div>

                {/* Date du prêt */}
                <div>
                  <label className="block text-xs font-semibold text-[#4C3D28] mb-1.5">
                    Date du prêt <span className="text-[#C53030]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#9B6D1D] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={loanDate}
                      onChange={(e) => setLoanDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#DFC99D] text-sm font-semibold text-[#22190E] focus:outline-none focus:border-[#B68122]"
                    />
                  </div>
                </div>

                {/* Durée de projection (mois) */}
                <div>
                  <label className="block text-xs font-semibold text-[#4C3D28] mb-1.5">
                    Durée de projection (mois) <span className="text-[#C53030]">*</span>
                  </label>
                  <div className="relative">
                    <Hourglass className="w-4 h-4 text-[#9B6D1D] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={durationMonths}
                      onChange={(e) => setDurationMonths(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#DFC99D] text-sm font-bold text-[#22190E] focus:outline-none focus:border-[#B68122]"
                    >
                      <option value={3}>3 mois</option>
                      <option value={6}>6 mois</option>
                      <option value={12}>12 mois</option>
                      <option value={18}>18 mois</option>
                      <option value={24}>24 mois</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Encadré bleu d'information : Calcul des intérêts */}
              <div className="rounded-xl bg-[#EEF5FC] border border-[#C6DCF5] p-3.5 flex items-start gap-3">
                <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-[#274973]">
                  <div className="font-bold text-[#1E3A8A] mb-0.5">
                    Calcul des intérêts (projection)
                  </div>
                  <div>Intérêt mensuel = Montant × Taux</div>
                  <div className="text-[#3B5F8F] mt-0.5">
                    Ex. : {formatEuroDecimal(numericAmount)} × {formatPercentDecimal(monthlyRate)} ={' '}
                    <span className="font-semibold">{formatEuroDecimal(monthlyInterest)} / mois</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-[#FDFBF6] rounded-2xl p-5 sm:p-6 shadow-xs border border-[#E4D3B2] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-[15px] font-bold text-[#1F170C]">
                    Étape 3 - Récapitulatif du prêt
                  </h3>
                  <p className="text-xs text-[#736045]">
                    Vérifiez l&apos;ensemble des informations avant d&apos;enregistrer le prêt.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF4E6] hover:bg-[#EFE2C6] border border-[#DFC99D] text-xs font-semibold text-[#5C3E0B] flex items-center gap-1.5 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Modifier les détails</span>
                </button>
              </div>

              <div className="divide-y divide-[#F0E6D2] text-sm bg-[#FFFDF9] border border-[#EFE3CB] rounded-xl px-4">
                <div className="py-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2.5 text-[#6B5A42]">
                    <Users className="w-4 h-4 text-[#9B7228]" />
                    Membre
                  </span>
                  <span className="font-bold text-[#22190E] text-right">
                    {selectedMember?.name} ({selectedMember?.id})
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2.5 text-[#6B5A42]">
                    <Coins className="w-4 h-4 text-[#9B7228]" />
                    Montant
                  </span>
                  <span className="font-bold text-[#22190E]">
                    {formatEuroDecimal(numericAmount)}
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2.5 text-[#6B5A42]">
                    <Percent className="w-4 h-4 text-[#9B7228]" />
                    Taux mensuel
                  </span>
                  <span className="font-bold text-[#22190E]">
                    {formatPercentDecimal(monthlyRate)}
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2.5 text-[#6B5A42]">
                    <Calendar className="w-4 h-4 text-[#9B7228]" />
                    Date du prêt
                  </span>
                  <span className="font-bold text-[#22190E]">{loanDate}</span>
                </div>

                <div className="py-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2.5 text-[#6B5A42]">
                    <Hourglass className="w-4 h-4 text-[#9B7228]" />
                    Projection
                  </span>
                  <span className="font-bold text-[#22190E]">{durationMonths} mois</span>
                </div>

                <div className="py-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2.5 text-[#6B5A42]">
                    <BarChart3 className="w-4 h-4 text-[#9B7228]" />
                    Intérêt mensuel
                  </span>
                  <span className="px-3 py-0.5 rounded-md bg-[#F9E8B8] border border-[#E3C172] font-bold text-[#5C3E0B]">
                    {formatEuroDecimal(monthlyInterest)}
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2.5 text-[#6B5A42]">
                    <Coins className="w-4 h-4 text-[#9B7228]" />
                    Intérêts totaux ({durationMonths} mois)
                  </span>
                  <span className="font-bold text-[#22190E]">
                    {formatEuroDecimal(totalInterests)}
                  </span>
                </div>

                <div className="py-3.5 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2.5 font-bold text-[#22190E]">
                    <span className="w-4 text-center font-serif font-bold text-[#9B7228]">Σ</span>
                    Montant total projeté
                  </span>
                  <span className="px-3.5 py-1 rounded-lg bg-gradient-to-r from-[#F9E6AD] to-[#F2D17B] border border-[#D4A441] font-bold text-[15px] text-[#3B2606] shadow-xs">
                    {formatEuroDecimal(projectedTotal)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Barre de boutons inférieure : Précédent / Suivant / Enregistrer le prêt */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2.5 rounded-xl bg-[#FDFBF6] border border-[#DFC99D] text-xs font-semibold text-[#4C3D28] hover:bg-[#EFE4CE] disabled:opacity-45 flex items-center gap-2 shadow-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>

            <div className="flex flex-wrap items-center gap-2.5">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => Math.min(3, s + 1))}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B88524] via-[#9D6D17] to-[#7D530E] text-[#FFF9EC] text-xs font-bold flex items-center gap-2 shadow-sm hover:brightness-110 transition-all"
                >
                  <span>Suivant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRegisterLoan}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9C6C18] via-[#80550F] to-[#634008] text-[#FFF9EC] text-xs font-bold flex items-center gap-2 shadow-md hover:brightness-110 active:scale-[0.99] transition-all border border-[#D4A441]/60"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Enregistrer le prêt</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Colonne latérale droite : Parcours de création + Règles du POC (V1) */}
        <div className="2xl:col-span-3 space-y-4">
          {/* Carte Parcours de création */}
          <div className="bg-[#FDFBF6] border border-[#DFC89A] rounded-2xl overflow-hidden shadow-xs">
            <div className="px-4 py-3 bg-gradient-to-r from-[#1E160D] via-[#3A2914] to-[#1E160D] text-[#FCE7A2] flex items-center gap-2.5 border-b border-[#D4A441]/40">
              <GitBranch className="w-4 h-4 text-[#E6BC5F]" />
              <h3 className="text-xs font-bold tracking-wide">Parcours de création</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { num: 1, text: 'Sélectionner un membre existant' },
                {
                  num: 2,
                  text: 'Renseigner le montant, le taux, la date et la durée de projection'
                },
                { num: 3, text: 'Vérifier le récapitulatif et enregistrer' }
              ].map((item) => (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => setCurrentStep(item.num)}
                  className="w-full flex items-start gap-2.5 text-left group"
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 transition-colors ${
                      currentStep === item.num
                        ? 'bg-gradient-to-br from-[#D9A73E] to-[#8C5E14] text-white shadow-xs'
                        : 'bg-[#B68326] text-[#FFF8EA] opacity-80 group-hover:opacity-100'
                    }`}
                  >
                    {item.num}
                  </span>
                  <span
                    className={`text-xs leading-snug ${
                      currentStep === item.num
                        ? 'font-bold text-[#1F170C]'
                        : 'text-[#4C3D28] group-hover:text-[#1F170C]'
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Carte Règles du POC (V1) */}
          <div className="bg-[#FDFBF6] border border-[#DFC89A] rounded-2xl overflow-hidden shadow-xs">
            <div className="px-4 py-3 bg-gradient-to-r from-[#1E160D] via-[#3A2914] to-[#1E160D] text-[#FCE7A2] flex items-center gap-2.5 border-b border-[#D4A441]/40">
              <Shield className="w-4 h-4 text-[#E6BC5F]" />
              <h3 className="text-xs font-bold tracking-wide">Règles du POC (V1)</h3>
            </div>
            <div className="p-4 space-y-2.5">
              {pocRules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3E3120]">
                  <span className="w-4 h-4 rounded-full bg-[#1D9A4B] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span className="leading-snug">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LoansModule };
