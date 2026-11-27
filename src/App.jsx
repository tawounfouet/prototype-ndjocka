import React from 'react';
import { Monitor, Smartphone, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { NdjockaLogo } from "./shared/ui/NdjockaLogo";
import { AdminDashboardView } from "./features/dashboard/AdminDashboardView";
import { MemberMobileView } from "./features/member-area/MemberMobileView";
import { QuickActionModal } from "./features/operations/QuickActionModal";

import { usePrototypeData } from './app/model/usePrototypeData';

export default function App() {
  const { viewMode, setViewMode, activeAdminTab, setActiveAdminTab, members, operations,
    mobileOps, modalType, setModalType, handleAddMember, handleUpdateMember,
    handleCreateLoan, handleAddOperation } = usePrototypeData();

  return (
    <div className="min-h-screen flex flex-col bg-[#120F0B] text-[#F5ECD9] font-sans selection:bg-[#D4A441]/30">

      {/* Barre supérieure de sélection de vue (fidèle aux badges de la maquette) */}
      <div className="w-full border-b border-[#D4A441]/25 bg-gradient-to-r from-[#14100C] via-[#1E1811] to-[#14100C] px-4 py-3 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-[1520px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <NdjockaLogo size="sm" />
            <div className="leading-tight">
              <span className="font-serif text-sm sm:text-base font-bold text-gold-gradient tracking-wide">
                LES AMIS DU NDJOCKA
              </span>
              <span className="hidden sm:inline text-xs text-[#C7B492] ml-2">
                - Maquette interactive Desktop &amp; Mobile
              </span>
            </div>
          </div>

          {/* Boutons Switcher : Espace Administration / Espace Membre / Vue Duo */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all ${
                viewMode === 'desktop'
                  ? 'gold-pill-active text-[#1A1308] border-[#FCE392] shadow-[0_0_14px_rgba(217,165,59,0.35)]'
                  : 'bg-[#1B150E] text-[#EBD7AE] border-[#C99A3B]/45 hover:border-[#F2CC70]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Espace Administration</span>
            </button>

            <button
              onClick={() => setViewMode('mobile')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all ${
                viewMode === 'mobile'
                  ? 'gold-pill-active text-[#1A1308] border-[#FCE392] shadow-[0_0_14px_rgba(217,165,59,0.35)]'
                  : 'bg-[#1B150E] text-[#EBD7AE] border-[#C99A3B]/45 hover:border-[#F2CC70]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Espace Membre</span>
            </button>

            <button
              onClick={() => setViewMode('duo')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all ${
                viewMode === 'duo'
                  ? 'gold-pill-active text-[#1A1308] border-[#FCE392] shadow-[0_0_14px_rgba(217,165,59,0.35)]'
                  : 'bg-[#1B150E] text-[#EBD7AE] border-[#C99A3B]/45 hover:border-[#F2CC70]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Vue Duo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Zone d'affichage principale */}
      <div className="flex-1 w-full max-w-[1560px] mx-auto px-3 sm:px-6 py-6 flex flex-col justify-center">
        {viewMode === 'duo' && (
          <div className="flex flex-col 2xl:flex-row items-center 2xl:items-start justify-center gap-7">
            {/* Cadre Desktop */}
            <div className="w-full flex-1 min-w-0">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C160F] border border-[#D4A441]/55 text-[#F6DA8B] text-xs font-serif font-semibold shadow-sm">
                  <Monitor className="w-3.5 h-3.5" />
                  Espace Administration
                </span>
              </div>
              <AdminDashboardView
                operations={operations}
                members={members}
                onAddMember={handleAddMember}
                onUpdateMember={handleUpdateMember}
                onCreateLoan={handleCreateLoan}
                onOpenModal={setModalType}
                activeTab={activeAdminTab}
                setActiveTab={setActiveAdminTab}
                compact={true}
              />
            </div>

            {/* Cadre Mobile */}
            <div className="w-full 2xl:w-auto flex flex-col items-center shrink-0">
              <div className="mb-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C160F] border border-[#D4A441]/55 text-[#F6DA8B] text-xs font-serif font-semibold shadow-sm">
                  <Smartphone className="w-3.5 h-3.5" />
                  Espace Membre
                </span>
              </div>
              <MemberMobileView mobileOps={mobileOps} />
            </div>
          </div>
        )}

        {viewMode === 'desktop' && (
          <div className="w-full max-w-[1320px] mx-auto">
            <AdminDashboardView
              operations={operations}
              members={members}
              onAddMember={handleAddMember}
              onUpdateMember={handleUpdateMember}
              onCreateLoan={handleCreateLoan}
              onOpenModal={setModalType}
              activeTab={activeAdminTab}
              setActiveTab={setActiveAdminTab}
            />
          </div>
        )}

        {viewMode === 'mobile' && (
          <div className="w-full flex justify-center py-2">
            <MemberMobileView mobileOps={mobileOps} />
          </div>
        )}
      </div>

      {/* Bandeau de pied de page (identique au bas de la maquette) */}
      <footer className="w-full border-t border-[#D4A441]/35 bg-gradient-to-r from-[#120E0A] via-[#1B150E] to-[#120E0A] px-4 py-3 mt-auto">
        <div className="max-w-[1520px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <NdjockaLogo size="sm" />
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-serif text-sm sm:text-base font-bold text-[#F5E3B3] tracking-wide">
                LES AMIS DU NDJOCKA
              </span>
              <span className="text-xs sm:text-sm text-[#CBB794]">
                - Gestion de tontine
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#E5D4B2]">
            {[
              'Cotisations',
              'Prêts',
              'Tontine',
              'Retards & sanctions',
              'Suivi personnel'
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E4B854]" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* Modale interactive pour les Actions rapides */}
      <QuickActionModal
        members={members}
        modalType={modalType}
        onClose={() => setModalType(null)}
        onSubmit={handleAddOperation}
      />
    </div>
  );
}