import React, { useState, useMemo } from 'react';
import { Users, Coins, HandCoins, RefreshCw, Bell, ChevronDown, Hourglass, Plus, X, Menu, Search } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { INITIAL_CAISSE_DATA, REPARTITION_DATA, SIDEBAR_ITEMS } from "../../data/demoData";
import { formatEuro } from "../../shared/lib/money";
import { NdjockaLogo } from "../../shared/ui/NdjockaLogo";
import { PalmSilhouette } from "../../shared/ui/PalmSilhouette";
import { OperationIcon } from "../../shared/ui/OperationIcon";
import { LoansModule } from "../loans/LoansModule";
import { MembersModule } from "../members/MembersModule";
import { SettingsModule } from "../settings/SettingsModule";
import { CustomCaisseTooltip } from "./CustomCaisseTooltip";

const AdminDashboardView = ({
  operations,
  members,
  onAddMember,
  onUpdateMember,
  onCreateLoan,
  onOpenModal,
  activeTab,
  setActiveTab,
  compact = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculs dynamiques si de nouvelles opérations sont ajoutées
  const totalCotisations = useMemo(() => {
    const extra = operations
      .filter((op) => op.id > 4 && op.type === 'cotisation')
      .reduce((acc, op) => acc + op.amount, 0);
    return 250000 + extra;
  }, [operations]);

  const totalPretsCount = useMemo(() => {
    const extra = operations.filter((op) => op.id > 4 && op.type === 'pret').length;
    return 43 + extra;
  }, [operations]);

  const totalPretsMontant = useMemo(() => {
    const extra = operations
      .filter((op) => op.id > 4 && op.type === 'pret')
      .reduce((acc, op) => acc + op.amount, 0);
    return 128000 + extra;
  }, [operations]);

  const kpis = [
    {
      icon: Users,
      value: '23',
      label: 'Membres actifs',
      sub: null
    },
    {
      icon: Coins,
      value: formatEuro(totalCotisations),
      label: 'Cotisations cumulées',
      sub: null
    },
    {
      icon: HandCoins,
      value: String(totalPretsCount),
      label: 'Prêts en cours',
      sub: `Montant : ${formatEuro(totalPretsMontant)}`
    },
    {
      icon: Hourglass,
      value: '10',
      label: 'Retards à régulariser',
      sub: null
    },
    {
      icon: Users,
      value: '21 000 €',
      label: 'Cagnotte disponible',
      sub: null
    }
  ];

  const getStatusBadgeStyle = (tone) => {
    if (tone === 'green') {
      return 'bg-[#DCF5E3] text-[#1D7A3C] border border-[#B5E7C4]';
    }
    if (tone === 'amber') {
      return 'bg-[#F9EBC8] text-[#8E6214] border border-[#EBD296]';
    }
    return 'bg-[#FDE2E1] text-[#B92B27] border border-[#F5BDBA]';
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full relative overflow-hidden bg-gradient-to-b from-[#17130F] via-[#1C1712] to-[#120E0A] text-[#E9DFC9]">
      {/* Logo Header */}
      <div className="px-4 pt-5 pb-4 flex items-center gap-2 border-b border-[#D4A441]/15">
        <NdjockaLogo size="sm" showPalmLeft={true} />
        <div className="leading-tight min-w-0">
          <div className="text-[9px] tracking-[0.14em] text-[#E6C26E] font-medium uppercase truncate">
            LES AMIS DU
          </div>
          <div className="font-serif text-[16px] font-bold tracking-wide text-gold-gradient truncate">
            NDJOCKA
          </div>
          <div className="text-[10px] italic text-[#C5B493] -mt-0.5 truncate">
            Gestion de tontine
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2.5 py-3 space-y-1 overflow-y-auto relative z-10 custom-scrollbar">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 text-left ${
                isActive
                  ? 'gold-pill-active text-[#1B1408] font-semibold shadow-md'
                  : 'text-[#DCD0B8] hover:bg-[#D4A441]/10 hover:text-[#F8DE8D]'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-[#231909]' : 'text-[#D4A441]'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Décoration Palmier Doré en bas de la sidebar */}
      <div className="relative h-28 pointer-events-none select-none overflow-hidden shrink-0">
        <PalmSilhouette className="w-40 h-40 absolute -bottom-4 -left-2 opacity-80" />
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#C7932E]/25 to-transparent" />
      </div>
    </div>
  );

  return (
    <div
      className={`w-full bg-[#EFE7D8] rounded-2xl overflow-hidden shadow-2xl border border-[#D6BE8E]/70 flex relative ${
        compact ? 'min-h-[640px]' : 'min-h-[720px]'
      }`}
    >
      {/* Sidebar Desktop */}
      <aside className="hidden lg:block w-[225px] shrink-0 border-r border-[#C99A3B]/25">
        {renderSidebarContent()}
      </aside>

      {/* Sidebar Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full z-10 shadow-2xl">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-[#2B2218] text-[#E6C26E]"
              aria-label="Fermer le menu"
            >
              <X className="w-4 h-4" />
            </button>
            {renderSidebarContent()}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-[#F7F1E5] via-[#F2E9D9] to-[#EAE0CC]">
        {/* Top Header */}
        <header className="px-4 sm:px-6 py-3.5 bg-[#FAF5EB]/90 border-b border-[#E2D2B4] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-[#EFE4CE] text-[#3B2B14] hover:bg-[#E5D3B0]"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E4C27A] to-[#B58328] flex items-center justify-center shadow-sm shrink-0">
              <Users className="w-5 h-5 text-[#1F170A]" />
            </div>
            <div className="min-w-0">
              <h1 className="font-serif text-lg sm:text-[21px] font-bold text-[#221A10] leading-tight truncate">
                Espace Administration
              </h1>
              <p className="text-[11px] sm:text-xs text-[#6B5A42] truncate">
                Pilotage et gestion de la tontine LES AMIS DU NDJOCKA
              </p>
            </div>
          </div>

          {/* Right Profile & Notifications */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-full hover:bg-[#EDE1C9] transition-colors text-[#2E2315]"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#DC2626] ring-2 ring-[#FAF5EB]" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#FFFDF8] border border-[#DFC99D] rounded-xl shadow-xl p-3 z-30">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EFE3CB]">
                    <span className="text-xs font-bold text-[#241B10]">Notifications (2)</span>
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="text-[#8C7756] hover:text-[#241B10]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-lg bg-[#FAF3E3]">
                      <p className="font-semibold text-[#2B2012]">Nouveau prêt validé</p>
                      <p className="text-[#6F5C41]">K. Martin - 1 000 € • 26 nov. 2026</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FEF2F2]">
                      <p className="font-semibold text-[#991B1B]">Retard à régulariser</p>
                      <p className="text-[#7F1D1D]">C. Mvogo - Sanction 10 €</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden sm:block h-8 w-px bg-[#DFCFAF]" />

            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#B8872C] via-[#7A5416] to-[#4A320C] p-[2px] shadow-sm">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8F651D] to-[#4F350C] flex items-center justify-center text-[#FCE7A2] font-serif font-bold text-xs">
                  AD
                </div>
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-[13px] font-bold text-[#231B11]">Administrateur</div>
                <div className="text-[11px] text-[#78654A]">Superviseur</div>
              </div>
              <ChevronDown className="w-4 h-4 text-[#6B5A42] hidden sm:block group-hover:text-[#231B11]" />
            </div>
          </div>
        </header>

        {/* Contenu Principal */}
        <main className="p-4 sm:p-5 space-y-4 flex-1">
          {activeTab === 'dashboard' ? (
            <>
              {/* Ligne des 5 KPIs */}
              <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
                {kpis.map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-gradient-to-b from-[#FFFDF8] to-[#F7EFE0] border border-[#E4D3B2] rounded-xl px-3.5 py-3 shadow-xs hover:shadow-md transition-shadow flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F3E2BE] to-[#DFC082] flex items-center justify-center shrink-0 border border-[#D4AF5F]/40">
                        <Icon className="w-5 h-5 text-[#6E4D16]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[17px] xl:text-[18px] font-bold text-[#1F170C] leading-tight truncate">
                          {kpi.value}
                        </div>
                        <div className="text-[11px] font-medium text-[#5C4C35] leading-snug">
                          {kpi.label}
                        </div>
                        {kpi.sub && (
                          <div className="text-[10px] text-[#7D6A4E] mt-0.5 truncate">
                            {kpi.sub}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </section>

              {/* Ligne Graphiques : Évolution de la caisse + Répartition des fonds */}
              <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                {/* Évolution de la caisse */}
                <div className="xl:col-span-7 bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-4 shadow-xs flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-serif text-[16px] font-bold text-[#21180E]">
                      Évolution de la caisse
                    </h2>
                    <span className="text-[11px] font-medium text-[#8A7350] bg-[#F5ECDA] px-2.5 py-0.5 rounded-full">
                      Exercice 2026
                    </span>
                  </div>
                  <div className="w-full h-[215px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={INITIAL_CAISSE_DATA}
                        margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="caisseGoldFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4A03E" stopOpacity={0.55} />
                            <stop offset="95%" stopColor="#E9C982" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#EAE0CC"
                        />
                        <XAxis
                          dataKey="month"
                          axisLine={{ stroke: '#DFCFAF' }}
                          tickLine={false}
                          tick={{ fill: '#5F4E37', fontSize: 11 }}
                        />
                        <YAxis
                          domain={[0, 250000]}
                          ticks={[0, 50000, 100000, 150000, 200000, 250000]}
                          axisLine={false}
                          tickLine={false}
                          width={54}
                          tick={{ fill: '#5F4E37', fontSize: 11 }}
                          tickFormatter={(v) =>
                            v === 0 ? '0' : v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                          }
                        />
                        <Tooltip content={<CustomCaisseTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="montant"
                          stroke="#9E6E1E"
                          strokeWidth={2.5}
                          fill="url(#caisseGoldFill)"
                          dot={{
                            r: 4,
                            fill: '#FFFBF0',
                            stroke: '#9E6E1E',
                            strokeWidth: 2
                          }}
                          activeDot={{
                            r: 6,
                            fill: '#D4A03E',
                            stroke: '#FFFBF0',
                            strokeWidth: 2
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Répartition des fonds */}
                <div className="xl:col-span-5 bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-4 shadow-xs flex flex-col">
                  <h2 className="font-serif text-[16px] font-bold text-[#21180E] mb-2">
                    Répartition des fonds
                  </h2>
                  <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className="relative w-[175px] h-[175px] shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={REPARTITION_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={52}
                            outerRadius={78}
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={1.5}
                            dataKey="percent"
                            stroke="none"
                          >
                            {REPARTITION_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(val, name) => [`${val} %`, name]}
                            contentStyle={{
                              backgroundColor: '#1C1712',
                              borderColor: '#D4A441',
                              borderRadius: '8px',
                              color: '#FBF6EA',
                              fontSize: '12px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Centre du Donut */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[15px] font-bold text-[#21180E]">
                          {formatEuro(totalCotisations)}
                        </span>
                        <span className="text-[11px] text-[#7A674B] font-medium">Total</span>
                      </div>
                    </div>

                    {/* Légende personnalisée */}
                    <div className="space-y-2.5 text-[13px] min-w-[130px]">
                      {REPARTITION_DATA.map((item) => (
                        <div key={item.name} className="flex items-center gap-2.5">
                          <span
                            className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-[#2D2214] font-medium">
                            {item.name}{' '}
                            <span className="text-[#6B5A42] font-normal">({item.percent} %)</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Ligne Bas : Dernières opérations + Actions rapides */}
              <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                {/* Dernières opérations */}
                <div className="xl:col-span-8 bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-4 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-serif text-[16px] font-bold text-[#21180E]">
                      Dernières opérations
                    </h2>
                    <ChevronDown className="w-4 h-4 text-[#8C7756]" />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-[#EFE5D1] text-[#4C3D28] text-[12px] font-semibold">
                          <th className="py-2 px-3 rounded-l-lg">Date</th>
                          <th className="py-2 px-3">Opération</th>
                          <th className="py-2 px-3">Membre</th>
                          <th className="py-2 px-3 text-right">Montant</th>
                          <th className="py-2 px-3 text-center rounded-r-lg">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EFE6D4] text-[13px]">
                        {operations.slice(0, 6).map((op) => (
                          <tr
                            key={op.id}
                            className="hover:bg-[#FAF4E8] transition-colors"
                          >
                            <td className="py-2.5 px-3 text-[#4E3F2A] whitespace-nowrap">
                              {op.date}
                            </td>
                            <td className="py-2.5 px-3 font-medium text-[#241B10] whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <OperationIcon type={op.type} />
                                <span>{op.label}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-[#3E3120] whitespace-nowrap">
                              {op.member}
                            </td>
                            <td
                              className={`py-2.5 px-3 text-right font-bold whitespace-nowrap ${
                                op.amountTone === 'red'
                                  ? 'text-[#C53030]'
                                  : 'text-[#1D7A3C]'
                              }`}
                            >
                              {op.amountDisplay}
                            </td>
                            <td className="py-2.5 px-3 text-center whitespace-nowrap">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${getStatusBadgeStyle(
                                  op.statusTone
                                )}`}
                              >
                                {op.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions rapides */}
                <div className="xl:col-span-4 bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-4 shadow-xs flex flex-col">
                  <h2 className="font-serif text-[16px] font-bold text-[#21180E] mb-3">
                    Actions rapides
                  </h2>
                  <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                    <button
                      onClick={() => setActiveTab('prets')}
                      className="w-full py-2.5 px-4 rounded-xl gold-pill-active text-[#1E1508] font-bold text-[13px] flex items-center gap-3 shadow-sm hover:brightness-105 active:scale-[0.99] transition-all"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Nouveau prêt</span>
                    </button>

                    <button
                      onClick={() => onOpenModal('cotisation')}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#FAF4E6] to-[#EFE2C6] border border-[#DFC798] text-[#2A1F10] font-semibold text-[13px] flex items-center gap-3 hover:from-[#F6ECD6] hover:to-[#E8D5AE] active:scale-[0.99] transition-all"
                    >
                      <Coins className="w-4 h-4 text-[#9B6D1D]" />
                      <span>Enregistrer une cotisation</span>
                    </button>

                    <button
                      onClick={() => onOpenModal('remboursement')}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#FAF4E6] to-[#EFE2C6] border border-[#DFC798] text-[#2A1F10] font-semibold text-[13px] flex items-center gap-3 hover:from-[#F6ECD6] hover:to-[#E8D5AE] active:scale-[0.99] transition-all"
                    >
                      <RefreshCw className="w-4 h-4 text-[#9B6D1D]" />
                      <span>Saisir un remboursement</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('tontine')}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#FAF4E6] to-[#EFE2C6] border border-[#DFC798] text-[#2A1F10] font-semibold text-[13px] flex items-center gap-3 hover:from-[#F6ECD6] hover:to-[#E8D5AE] active:scale-[0.99] transition-all"
                    >
                      <Users className="w-4 h-4 text-[#9B6D1D]" />
                      <span>Gérer la tontine (bénéficiaire)</span>
                    </button>
                  </div>
                </div>
              </section>
            </>
          ) : activeTab === 'membres' ? (
            <MembersModule
              members={members}
              onAddMember={onAddMember}
              onUpdateMember={onUpdateMember}
            />
          ) : activeTab === 'prets' ? (
            <LoansModule
              members={members}
              onCreateLoan={onCreateLoan}
              onGoToDashboard={() => setActiveTab('dashboard')}
            />
          ) : activeTab === 'parametres' ? (
            <SettingsModule />
          ) : (
            /* Vue secondaire interactive pour les autres onglets du menu */
            <div className="bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE3CB] pb-3">
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#21180E] capitalize">
                    {SIDEBAR_ITEMS.find((i) => i.id === activeTab)?.label}
                  </h2>
                  <p className="text-xs text-[#6B5A42]">
                    Gestion détaillée - LES AMIS DU NDJOCKA
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#8C7756] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher un membre..."
                      className="pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#F7F1E5] border border-[#DFC99D] text-[#241B10] focus:outline-none focus:border-[#B68122]"
                    />
                  </div>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="px-3 py-1.5 rounded-lg gold-pill-active text-[#1B1408] text-xs font-bold"
                  >
                    Retour Tableau de bord
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {members.filter((m) =>
                  m.name.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((m) => (
                  <div
                    key={m.name}
                    className="p-3.5 rounded-xl bg-[#FAF4E8] border border-[#E5D4B2] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9962B] to-[#6E4D16] flex items-center justify-center text-[#FFF6DC] font-serif font-bold text-xs">
                        {m.name
                          .split(' ')
                          .map((p) => p[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#22190E]">{m.name}</div>
                        <div className="text-xs text-[#736045]">{m.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#1D7A3C]">{m.cotisations}</div>
                      <span
                        className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold ${
                          m.statut === 'Actif'
                            ? 'bg-[#DCF5E3] text-[#1D7A3C]'
                            : 'bg-[#FDE2E1] text-[#B92B27]'
                        }`}
                      >
                        {m.statut}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export { AdminDashboardView };
