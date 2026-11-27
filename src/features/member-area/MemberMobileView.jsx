import React, { useState } from 'react';
import { Home, Coins, HandCoins, RefreshCw, AlertTriangle, Bell, Eye, EyeOff, ArrowRight, List, History, User, Wifi, Battery, Signal } from 'lucide-react';
import { NdjockaLogo } from "../../shared/ui/NdjockaLogo";
import { PalmSilhouette } from "../../shared/ui/PalmSilhouette";
import { OperationIcon } from "../../shared/ui/OperationIcon";

const MemberMobileView = ({ mobileOps }) => {
  const [hideBalances, setHideBalances] = useState(false);
  const [mobileTab, setMobileTab] = useState('accueil');
  const [activeQuickSection, setActiveQuickSection] = useState(null);

  const quickCards = [
    { id: 'cotisations', label: 'Mes cotisations', icon: Coins, value: '30 000 €' },
    { id: 'prets', label: 'Mes prêts', icon: HandCoins, value: '1 000 €' },
    { id: 'remboursements', label: 'Mes remboursements', icon: RefreshCw, value: '4 500 €' },
    { id: 'retards', label: 'Mes retards & sanctions', icon: AlertTriangle, value: '0 €' }
  ];

  return (
    <div className="mx-auto w-full max-w-[355px] shrink-0">
      {/* Coque iPhone réaliste */}
      <div className="rounded-[44px] p-[9px] bg-gradient-to-b from-[#3A3022] via-[#1B1712] to-[#3A3022] shadow-[0_24px_60px_rgba(0,0,0,0.55)] border border-[#D4A441]/50 relative">
        {/* Écran interne */}
        <div className="rounded-[36px] overflow-hidden bg-[#F4ECE0] flex flex-col min-h-[690px] relative border border-[#2C241A]">
          {/* Partie supérieure sombre (Status bar + Header + Carte Ma situation) */}
          <div className="bg-gradient-to-b from-[#15110D] via-[#1D1711] to-[#231B12] text-[#FBF5E8] pt-3 pb-4 px-4 relative overflow-hidden">
            {/* Décoration Palmier doré en haut à droite */}
            <PalmSilhouette className="w-36 h-36 absolute -right-6 top-8 opacity-75 pointer-events-none" />

            {/* Barre d'état iOS + Dynamic Island */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#F4EBD8] mb-3 px-1 relative z-10">
              <span>14:37</span>
              <div className="w-24 h-5 bg-black rounded-full border border-white/10" />
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Header Logo + Cloche */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <NdjockaLogo size="sm" />
                <div className="leading-tight">
                  <div className="text-[8.5px] tracking-[0.14em] text-[#E6C26E] uppercase">
                    LES AMIS DU
                  </div>
                  <div className="font-serif text-[15px] font-bold text-gold-gradient tracking-wide">
                    NDJOCKA
                  </div>
                  <div className="text-[10px] text-[#CBB896]">Ma tontine</div>
                </div>
              </div>
              <button
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#E6C26E] transition-colors"
                aria-label="Notifications membre"
              >
                <Bell className="w-4 h-4" />
              </button>
            </div>

            {/* Salutation Membre */}
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D8A843] to-[#6B4A14] p-[2px] shadow-md">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#6C5229] to-[#3B2B13] flex items-center justify-center text-[#F9E4A3] font-serif font-bold text-sm">
                  KM
                </div>
              </div>
              <div>
                <div className="text-[15px] font-semibold text-[#FFF8EA] leading-tight">
                  Bonjour K. Martin
                </div>
                <div className="text-[11px] text-[#C5B391]">Membre depuis 2024</div>
              </div>
            </div>

            {/* Carte "Ma situation" */}
            <div className="relative z-10 rounded-2xl p-3.5 bg-gradient-to-br from-[#4D3718] via-[#2F210E] to-[#1D1408] border border-[#E2B85B]/60 shadow-lg overflow-hidden">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-12 bg-[#F2CA6B]/25 blur-xl pointer-events-none" />
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[13px] font-semibold text-[#F6DE9B]">
                  Ma situation
                </span>
                <button
                  onClick={() => setHideBalances(!hideBalances)}
                  className="text-[#E6C26E] hover:text-white transition-colors p-0.5"
                  aria-label="Masquer ou afficher les montants"
                >
                  {hideBalances ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="space-y-1.5 text-[13px]">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#D4A441]/20">
                  <span className="text-[#DFD0B5]">Cotisations</span>
                  <span className="font-bold text-[#FFF8EA]">
                    {hideBalances ? '•••• €' : '30 000 €'}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-[#D4A441]/20">
                  <span className="text-[#DFD0B5]">Prêts en cours</span>
                  <span className="font-bold text-[#FFF8EA]">
                    {hideBalances ? '•••• €' : '1 000 €'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[#F4DE9D] font-semibold">Solde net</span>
                  <span className="font-bold text-[15px] text-[#FCE392]">
                    {hideBalances ? '•••• €' : '+ 29 000 €'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Corps clair de l'application mobile */}
          <div className="flex-1 px-4 pt-3.5 pb-4 bg-gradient-to-b from-[#F5EFE3] to-[#ECE2CF] space-y-4">
            {mobileTab === 'accueil' ? (
              <>
                {/* Grille 2x2 des actions membre */}
                <div className="grid grid-cols-2 gap-2.5">
                  {quickCards.map((card) => {
                    const Icon = card.icon;
                    const isSelected = activeQuickSection === card.id;
                    return (
                      <button
                        key={card.id}
                        onClick={() =>
                          setActiveQuickSection(isSelected ? null : card.id)
                        }
                        className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all shadow-xs ${
                          isSelected
                            ? 'bg-[#F8ECD0] border-[#C9962B] scale-[0.98]'
                            : 'bg-[#FFFDF9] border-[#E4D4B4] hover:border-[#CFA146]'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-[#9B6D1D]" />
                        <span className="text-[11.5px] font-semibold text-[#2A2012] leading-tight">
                          {card.label}
                        </span>
                        {isSelected && (
                          <span className="text-[11px] font-bold text-[#8E6114]">
                            {card.value}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Dernières opérations */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[13.5px] font-bold text-[#22190E]">
                      Dernières opérations
                    </h3>
                    <button
                      onClick={() => setMobileTab('operations')}
                      className="text-[11.5px] font-semibold text-[#8A621B] flex items-center gap-1 hover:underline"
                    >
                      <span>Voir tout</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="bg-[#FFFDF9] rounded-2xl border border-[#E4D4B4] divide-y divide-[#EFE5D2] shadow-xs overflow-hidden">
                    {mobileOps.slice(0, 2).map((op) => (
                      <div
                        key={op.id}
                        className="px-3.5 py-2.5 flex items-center justify-between hover:bg-[#FAF4E8] transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#F6EBD4] flex items-center justify-center">
                            <OperationIcon type={op.type} />
                          </div>
                          <div>
                            <div className="text-[12.5px] font-semibold text-[#231A0F] leading-tight">
                              {op.label}
                            </div>
                            <div className="text-[10.5px] text-[#7D6B4F]">
                              {op.date}
                            </div>
                          </div>
                        </div>
                        <div className="text-[13px] font-bold text-[#1D7A3C]">
                          {op.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Contenu des autres onglets mobile */
              <div className="bg-[#FFFDF9] rounded-2xl border border-[#E4D4B4] p-3.5 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#EFE5D2] pb-2">
                  <span className="text-[13px] font-bold text-[#231A0F] capitalize">
                    {mobileTab === 'operations'
                      ? 'Toutes mes opérations'
                      : mobileTab === 'historique'
                      ? 'Historique annuel'
                      : 'Mon profil membre'}
                  </span>
                  <button
                    onClick={() => setMobileTab('accueil')}
                    className="text-[11px] font-semibold text-[#9B6D1D]"
                  >
                    Accueil
                  </button>
                </div>
                {mobileTab === 'profil' ? (
                  <div className="space-y-2 text-xs text-[#4C3D28]">
                    <div className="flex justify-between py-1 border-b border-[#F2E9D8]">
                      <span>Nom complet</span>
                      <span className="font-bold text-[#231A0F]">K. Martin</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F2E9D8]">
                      <span>Statut</span>
                      <span className="font-bold text-[#1D7A3C]">Membre actif</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Ancienneté</span>
                      <span className="font-bold text-[#231A0F]">Depuis 2024</span>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-[#EFE5D2]">
                    {mobileOps.map((op) => (
                      <div
                        key={op.id}
                        className="py-2 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <OperationIcon type={op.type} />
                          <div>
                            <div className="text-xs font-semibold text-[#231A0F]">
                              {op.label}
                            </div>
                            <div className="text-[10px] text-[#7D6B4F]">{op.date}</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#1D7A3C]">
                          {op.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Barre de navigation inférieure sombre */}
          <nav className="bg-[#18130E] border-t border-[#D4A441]/30 px-2 pt-2 pb-3 grid grid-cols-4 gap-1">
            {[
              { id: 'accueil', label: 'Accueil', icon: Home },
              { id: 'operations', label: 'Opérations', icon: List },
              { id: 'historique', label: 'Historique', icon: History },
              { id: 'profil', label: 'Mon profil', icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = mobileTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMobileTab(tab.id)}
                  className={`flex flex-col items-center gap-1 py-1 rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#F6D57C]'
                      : 'text-[#A99B84] hover:text-[#E6C26E]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'drop-shadow-[0_0_6px_rgba(246,213,124,0.65)]' : ''
                    }`}
                  />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export { MemberMobileView };
