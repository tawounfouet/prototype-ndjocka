import React, { useState, useMemo } from 'react';
import { Users, Coins, Plus, Eye, User, CheckCircle2, X, Search, Check, UserPlus, Phone, Mail, Calendar, Pencil, MoreHorizontal, Filter, ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText, CreditCard, Clock } from 'lucide-react';
import { SAMPLE_MEMBERS } from "../../data/demoData";
import { formatEuroDecimal } from "../../shared/lib/money";

const MembersModule = ({ members, onAddMember, onUpdateMember }) => {
  // 'list' | 'create' | 'edit' | 'detail'
  const [subView, setSubView] = useState('list');
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || 'M-001');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Actif' | 'Inactif'
  const [searchTerm, setSearchTerm] = useState('');
  const [loanFilterOnly, setLoanFilterOnly] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailTab, setDetailTab] = useState('overview'); // 'overview' | 'prets' | 'cotisations' | 'historique'

  // État du formulaire de création / modification
  const emptyForm = {
    nom: '',
    prenom: '',
    sexe: 'Masculin',
    dateNaissance: '',
    pieceType: 'Carte nationale',
    pieceNumero: '',
    phonePrefix: '+237',
    phone: '',
    email: '',
    dateAdhesion: '26 nov. 2026',
    statut: 'Actif',
    notes: ''
  };

  const [formData, setFormData] = useState(emptyForm);

  const selectedMember = useMemo(
    () => members.find((m) => m.id === selectedMemberId) || members[0],
    [members, selectedMemberId]
  );

  // Compteurs alignés sur la maquette (+ ajout dynamique si de nouveaux membres sont créés)
  const extraCount = Math.max(0, members.length - SAMPLE_MEMBERS.length);
  const totalMembersCount = 128 + extraCount;
  const activeMembersCount = 124 + members.slice(SAMPLE_MEMBERS.length).filter((m) => m.statut === 'Actif').length;
  const inactiveMembersCount = 4 + members.slice(SAMPLE_MEMBERS.length).filter((m) => m.statut === 'Inactif').length;

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      if (statusFilter !== 'all' && m.statut !== statusFilter) return false;
      if (loanFilterOnly && m.pretsCount === 0) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const match =
          m.name.toLowerCase().includes(q) ||
          m.id.toLowerCase().includes(q) ||
          m.phone.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [members, statusFilter, loanFilterOnly, searchTerm]);

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredMembers.slice(start, start + rowsPerPage);
  }, [filteredMembers, currentPage, rowsPerPage]);

  const openCreateView = () => {
    setFormData(emptyForm);
    setSubView('create');
  };

  const openEditView = (member) => {
    setSelectedMemberId(member.id);
    setFormData({
      nom: member.nom || member.name,
      prenom: member.prenom || '',
      sexe: member.sexe || 'Masculin',
      dateNaissance: member.dateNaissance || '',
      pieceType: member.pieceType || 'Carte nationale',
      pieceNumero: member.pieceNumero || '',
      phonePrefix: member.phonePrefix || '+237',
      phone: member.phone || '',
      email: member.email || '',
      dateAdhesion: member.dateAdhesion || '26 nov. 2026',
      statut: member.statut || 'Actif',
      notes: member.notes || ''
    });
    setSubView('edit');
  };

  const openDetailView = (member) => {
    setSelectedMemberId(member.id);
    setDetailTab('overview');
    setSubView('detail');
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!formData.nom.trim() || !formData.prenom.trim()) return;

    const firstInitial = formData.prenom.trim().charAt(0).toUpperCase();
    const lastInitial = formData.nom.trim().charAt(0).toUpperCase();
    const displayName = `${firstInitial}. ${formData.nom.trim()}`;

    if (subView === 'edit' && selectedMember) {
      const updated = {
        ...selectedMember,
        ...formData,
        initials: `${firstInitial}${lastInitial}`,
        name: displayName
      };
      onUpdateMember(updated);
      setSubView('detail');
    } else {
      const nextNum = String(members.length + 1).padStart(3, '0');
      const newMember = {
        id: `M-${nextNum}`,
        initials: `${firstInitial}${lastInitial}`,
        name: displayName,
        ...formData,
        pretsCount: 0,
        pretsMontantTotal: 0,
        interetMensuel: 0,
        cotisations: '0 €',
        prets: '0 €',
        role: 'Membre depuis 2026',
        activites: [
          { date: formData.dateAdhesion || '26 nov. 2026', text: 'Adhésion à la tontine.', active: true }
        ]
      };
      onAddMember(newMember);
      setSelectedMemberId(newMember.id);
      setSubView('detail');
    }
  };

  // Fil d'Ariane supérieur
  const breadcrumbLabel =
    subView === 'list'
      ? 'Liste des membres'
      : subView === 'create'
      ? 'Nouveau membre'
      : subView === 'edit'
      ? 'Modifier le membre'
      : 'Fiche membre';

  return (
    <div className="space-y-4">
      {/* Barre Fil d'Ariane sombre façon maquette */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 rounded-xl bg-[#1A1510] text-[#E9DCBF] border border-[#D4A441]/30 text-xs">
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-[#E5B957]" />
          <button
            onClick={() => setSubView('list')}
            className="hover:text-[#FCE392] transition-colors font-medium"
          >
            Membres
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#8D7856]" />
          <span className="text-[#FCE392] font-semibold">{breadcrumbLabel}</span>
        </div>

        {/* Raccourcis rapides de démonstration entre les 3 écrans */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSubView('list')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              subView === 'list'
                ? 'gold-pill-active text-[#1B1408]'
                : 'bg-white/5 text-[#D9C7A3] hover:bg-white/10'
            }`}
          >
            Liste
          </button>
          <button
            onClick={openCreateView}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              subView === 'create'
                ? 'gold-pill-active text-[#1B1408]'
                : 'bg-white/5 text-[#D9C7A3] hover:bg-white/10'
            }`}
          >
            Nouveau membre
          </button>
          <button
            onClick={() => openDetailView(selectedMember || members[0])}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              subView === 'detail'
                ? 'gold-pill-active text-[#1B1408]'
                : 'bg-white/5 text-[#D9C7A3] hover:bg-white/10'
            }`}
          >
            Fiche membre
          </button>
        </div>
      </div>

      {/* ====================================================================
          SOUS-VUE 1 : LISTE DES MEMBRES
          ==================================================================== */}
      {subView === 'list' && (
        <div className="space-y-4">
          {/* En-tête + 4 Mini KPIs */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E4C27A] to-[#B58328] flex items-center justify-center shadow-sm shrink-0">
                <Users className="w-6 h-6 text-[#1F170A]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1F170C] leading-tight">
                  Gestion des membres
                </h2>
                <p className="text-xs text-[#6B5A42]">
                  Créer, consulter et gérer les membres de la tontine.
                </p>
              </div>
            </div>

            {/* 4 Mini cartes KPI */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { icon: Users, value: totalMembersCount, label: 'Membres' },
                { icon: UserPlus, value: 5 + extraCount, label: 'Nouveaux (30 j)' },
                { icon: Coins, value: 36, label: 'Membres avec prêt' },
                { icon: CheckCircle2, value: 92 + extraCount, label: 'Membres sans prêt' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#FDFBF6] border border-[#E4D3B2] rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F5E7C8] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#8E6214]" />
                    </div>
                    <div className="leading-tight min-w-0">
                      <div className="text-[15px] font-bold text-[#21180E]">{stat.value}</div>
                      <div className="text-[10.5px] text-[#6F5D43] truncate">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carte principale du tableau */}
          <div className="bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-4 shadow-xs space-y-4">
            {/* Barre d'outils : Onglets statut + Recherche + Filtres + Bouton Nouveau membre */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Filtres de statut */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: `Tous les membres (${totalMembersCount})` },
                  { id: 'Actif', label: `Actifs (${activeMembersCount})` },
                  { id: 'Inactif', label: `Inactifs (${inactiveMembersCount})` }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setStatusFilter(tab.id);
                      setCurrentPage(1);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      statusFilter === tab.id
                        ? 'bg-gradient-to-r from-[#8C6117] to-[#B68326] text-[#FFF8EA] shadow-xs'
                        : 'bg-[#F5EFE3] text-[#4C3D28] border border-[#E4D4B4] hover:bg-[#EFE4CE]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Recherche + Filtres + CTA Nouveau membre */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 sm:flex-initial sm:w-64">
                  <Search className="w-4 h-4 text-[#8C7756] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Rechercher un membre (nom, téléphone, matricule...)"
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-[#241B10] placeholder-[#9B8869] focus:outline-none focus:border-[#B68122]"
                  />
                </div>

                <button
                  onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    loanFilterOnly || showFiltersPanel
                      ? 'bg-[#F6E8C8] border-[#C8962E] text-[#6B4A10]'
                      : 'bg-[#FAF6EE] border-[#DFC99D] text-[#4C3D28] hover:bg-[#F3E9D6]'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filtres</span>
                </button>

                <button
                  onClick={openCreateView}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#B88524] via-[#9D6D17] to-[#7D530E] text-[#FFF9EC] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-110 active:scale-[0.99] transition-all"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Nouveau membre</span>
                </button>
              </div>
            </div>

            {/* Panneau filtre optionnel */}
            {showFiltersPanel && (
              <div className="px-3.5 py-2.5 rounded-xl bg-[#F8F1E3] border border-[#E5D3AF] flex flex-wrap items-center justify-between gap-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#3E3120] font-medium">
                  <input
                    type="checkbox"
                    checked={loanFilterOnly}
                    onChange={(e) => {
                      setLoanFilterOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="rounded border-[#C89A3B] accent-[#9E6E1E]"
                  />
                  Afficher uniquement les membres avec prêt en cours
                </label>
                {loanFilterOnly && (
                  <button
                    onClick={() => setLoanFilterOnly(false)}
                    className="text-[#8E6214] font-semibold hover:underline"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            )}

            {/* Tableau des membres */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[740px]">
                <thead>
                  <tr className="bg-[#EFE5D1] text-[#4C3D28] text-[12px] font-semibold">
                    <th className="py-2.5 px-3 rounded-l-lg">N°</th>
                    <th className="py-2.5 px-3">Membre</th>
                    <th className="py-2.5 px-3">Téléphone</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Date d&apos;adhésion</th>
                    <th className="py-2.5 px-3 text-center">Statut</th>
                    <th className="py-2.5 px-3 text-center">Prêts</th>
                    <th className="py-2.5 px-3 text-center rounded-r-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE6D4] text-[13px]">
                  {paginatedMembers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-xs text-[#7D6A4E]">
                        Aucun membre ne correspond à votre recherche.
                      </td>
                    </tr>
                  ) : (
                    paginatedMembers.map((m) => (
                      <tr
                        key={m.id}
                        className="hover:bg-[#FAF4E8] transition-colors group"
                      >
                        <td className="py-2.5 px-3 font-semibold text-[#5C4C35] whitespace-nowrap">
                          {m.id}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <button
                            onClick={() => openDetailView(m)}
                            className="flex items-center gap-2.5 text-left group-hover:text-[#8E6214]"
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C89A3F] to-[#7D5718] flex items-center justify-center text-[#FFF6DC] font-serif font-bold text-[11px] shrink-0 shadow-xs">
                              {m.initials}
                            </div>
                            <span className="font-bold text-[#22190E] group-hover:underline">
                              {m.name}
                            </span>
                          </button>
                        </td>
                        <td className="py-2.5 px-3 text-[#4C3D28] whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#9B7228]" />
                            <span>
                              {m.phonePrefix} {m.phone}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-[#4C3D28] whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#9B7228]" />
                            <span>{m.email}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-[#4C3D28] whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#9B7228]" />
                            <span>{m.dateAdhesion}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center whitespace-nowrap">
                          <span
                            className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold ${
                              m.statut === 'Actif'
                                ? 'bg-[#DCF5E3] text-[#1D7A3C] border border-[#B5E7C4]'
                                : 'bg-[#FDE2E1] text-[#B92B27] border border-[#F5BDBA]'
                            }`}
                          >
                            {m.statut}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold text-[#22190E]">
                          {m.pretsCount}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => openDetailView(m)}
                              title="Voir la fiche membre"
                              className="p-1.5 rounded-lg hover:bg-[#EFE2C6] text-[#8A611C] transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openEditView(m)}
                              title="Modifier le membre"
                              className="p-1.5 rounded-lg hover:bg-[#EFE2C6] text-[#8A611C] transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => openDetailView(m)}
                              title="Plus d'options"
                              className="p-1.5 rounded-lg hover:bg-[#EFE2C6] text-[#5C4C35] transition-colors"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pied de tableau : Pagination fidèle à la maquette */}
            <div className="pt-3 border-t border-[#EFE5D2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B5A42]">
              <div>
                Affichage de{' '}
                <span className="font-semibold text-[#22190E]">
                  {filteredMembers.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}
                </span>{' '}
                à{' '}
                <span className="font-semibold text-[#22190E]">
                  {Math.min(currentPage * rowsPerPage, filteredMembers.length)}
                </span>{' '}
                sur <span className="font-semibold text-[#22190E]">{totalMembersCount}</span> membres
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span>Lignes par page :</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 rounded-md bg-[#FAF6EE] border border-[#DFC99D] text-[#22190E] font-semibold focus:outline-none"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-md border border-[#E4D4B4] bg-[#FAF6EE] hover:bg-[#EFE4CE] disabled:opacity-40"
                    aria-label="Première page"
                  >
                    <ChevronsLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-md border border-[#E4D4B4] bg-[#FAF6EE] hover:bg-[#EFE4CE] disabled:opacity-40"
                    aria-label="Page précédente"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 rounded-md text-xs font-bold transition-colors ${
                        currentPage === page
                          ? 'bg-gradient-to-b from-[#9E6E1E] to-[#7B5210] text-white shadow-xs'
                          : 'border border-[#E4D4B4] bg-[#FAF6EE] text-[#4C3D28] hover:bg-[#EFE4CE]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <span className="px-1 text-[#8C7756]">...</span>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-2 h-7 rounded-md text-xs font-semibold border border-[#E4D4B4] bg-[#FAF6EE] text-[#4C3D28] hover:bg-[#EFE4CE]"
                  >
                    26
                  </button>

                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage * rowsPerPage >= filteredMembers.length}
                    className="p-1.5 rounded-md border border-[#E4D4B4] bg-[#FAF6EE] hover:bg-[#EFE4CE] disabled:opacity-40"
                    aria-label="Page suivante"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.max(1, Math.ceil(filteredMembers.length / rowsPerPage)))}
                    className="p-1.5 rounded-md border border-[#E4D4B4] bg-[#FAF6EE] hover:bg-[#EFE4CE]"
                    aria-label="Dernière page"
                  >
                    <ChevronsRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SOUS-VUE 2 : CRÉATION / MODIFICATION D'UN MEMBRE
          ==================================================================== */}
      {(subView === 'create' || subView === 'edit') && (
        <form onSubmit={handleSaveMember} className="space-y-4">
          {/* En-tête avec bouton retour */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSubView('list')}
              className="w-9 h-9 rounded-xl bg-[#FDFBF6] border border-[#E4D3B2] flex items-center justify-center text-[#4C3D28] hover:bg-[#F3E9D6] transition-colors shadow-xs"
              aria-label="Retour à la liste"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E4C27A] to-[#B58328] flex items-center justify-center shadow-sm shrink-0">
              <UserPlus className="w-5 h-5 text-[#1F170A]" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1F170C] leading-tight">
                {subView === 'edit' ? 'Modification du membre' : "Création d'un membre"}
              </h2>
              <p className="text-xs text-[#6B5A42]">
                {subView === 'edit'
                  ? 'Mettre à jour les informations du membre.'
                  : 'Enregistrer un nouveau membre dans la tontine.'}
              </p>
            </div>
          </div>

          {/* Formulaire en 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Colonne gauche : Informations personnelles */}
            <div className="lg:col-span-6 bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-5 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-[#EFE5D2]">
                <User className="w-4 h-4 text-[#9B6D1D]" />
                <h3 className="text-sm font-bold text-[#22190E]">Informations personnelles</h3>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                  Nom <span className="text-[#C53030]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-sm text-[#22190E] focus:outline-none focus:border-[#B68122]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                  Prénom(s) <span className="text-[#C53030]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-sm text-[#22190E] focus:outline-none focus:border-[#B68122]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                  Sexe <span className="text-[#C53030]">*</span>
                </label>
                <select
                  value={formData.sexe}
                  onChange={(e) => setFormData({ ...formData, sexe: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-sm text-[#22190E] focus:outline-none focus:border-[#B68122]"
                >
                  <option value="Masculin">Masculin</option>
                  <option value="Féminin">Féminin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                  Date de naissance
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#8C7756] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.dateNaissance}
                    onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                    placeholder="14 mars 1992"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-sm text-[#22190E] focus:outline-none focus:border-[#B68122]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                  Pièce d&apos;identité <span className="text-[#8C7756] font-normal">(optionnel)</span>
                </label>
                <select
                  value={formData.pieceType}
                  onChange={(e) => setFormData({ ...formData, pieceType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-sm text-[#22190E] focus:outline-none focus:border-[#B68122]"
                >
                  <option value="Carte nationale">Carte nationale</option>
                  <option value="Passeport">Passeport</option>
                  <option value="Permis de conduire">Permis de conduire</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                  N° de pièce
                </label>
                <input
                  type="text"
                  value={formData.pieceNumero}
                  onChange={(e) => setFormData({ ...formData, pieceNumero: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-sm text-[#22190E] focus:outline-none focus:border-[#B68122]"
                />
              </div>
            </div>

            {/* Colonne droite : Coordonnées + Informations d'adhésion + Notes */}
            <div className="lg:col-span-6 space-y-4">
              {/* Coordonnées */}
              <div className="bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-5 shadow-xs space-y-3.5">
                <div className="flex items-center gap-2 pb-2 border-b border-[#EFE5D2]">
                  <Phone className="w-4 h-4 text-[#9B6D1D]" />
                  <h3 className="text-sm font-bold text-[#22190E]">Coordonnées</h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                    Téléphone <span className="text-[#C53030]">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-xs font-semibold text-[#22190E] shrink-0">
                      <span className="inline-flex w-4 h-3 rounded-[2px] overflow-hidden">
                        <span className="w-1/3 bg-[#007A5E]" />
                        <span className="w-1/3 bg-[#CE1126]" />
                        <span className="w-1/3 bg-[#FCD116]" />
                      </span>
                      <select
                        value={formData.phonePrefix}
                        onChange={(e) => setFormData({ ...formData, phonePrefix: e.target.value })}
                        className="bg-transparent focus:outline-none"
                      >
                        <option value="+237">+237</option>
                        <option value="+33">+33</option>
                        <option value="+225">+225</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-sm text-[#22190E] focus:outline-none focus:border-[#B68122]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4C3D28] mb-1">Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C7756] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-sm text-[#22190E] focus:outline-none focus:border-[#B68122]"
                    />
                  </div>
                </div>
              </div>

              {/* Informations d'adhésion */}
              <div className="bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-5 shadow-xs space-y-3.5">
                <div className="flex items-center gap-2 pb-2 border-b border-[#EFE5D2]">
                  <Calendar className="w-4 h-4 text-[#9B6D1D]" />
                  <h3 className="text-sm font-bold text-[#22190E]">Informations d&apos;adhésion</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                      Date d&apos;adhésion <span className="text-[#C53030]">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#8C7756] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.dateAdhesion}
                        onChange={(e) => setFormData({ ...formData, dateAdhesion: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-sm text-[#22190E] focus:outline-none focus:border-[#B68122]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                      Statut <span className="text-[#C53030]">*</span>
                    </label>
                    <div className="relative">
                      <span
                        className={`w-2.5 h-2.5 rounded-full absolute left-3 top-1/2 -translate-y-1/2 ${
                          formData.statut === 'Actif' ? 'bg-[#1D7A3C]' : 'bg-[#C53030]'
                        }`}
                      />
                      <select
                        value={formData.statut}
                        onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-sm font-semibold text-[#22190E] focus:outline-none focus:border-[#B68122]"
                      >
                        <option value="Actif">Actif</option>
                        <option value="Inactif">Inactif</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes (optionnel) */}
              <div className="bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-5 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[#EFE5D2]">
                  <FileText className="w-4 h-4 text-[#9B6D1D]" />
                  <h3 className="text-sm font-bold text-[#22190E]">
                    Notes <span className="text-xs font-normal text-[#8C7756]">(optionnel)</span>
                  </h3>
                </div>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ex. : Informations complémentaires, remarques..."
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#DFC99D] text-sm text-[#22190E] placeholder-[#9B8869] focus:outline-none focus:border-[#B68122] resize-none"
                />
              </div>

              {/* Boutons d'action bas */}
              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSubView('list')}
                  className="px-4 py-2.5 rounded-xl bg-[#FDFBF6] border border-[#DFC99D] text-xs font-semibold text-[#4C3D28] hover:bg-[#EFE4CE] flex items-center gap-1.5 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Annuler</span>
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B88524] via-[#9D6D17] to-[#7D530E] text-[#FFF9EC] text-xs font-bold flex items-center gap-1.5 shadow-md hover:brightness-110 active:scale-[0.99] transition-all"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Enregistrer le membre</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ====================================================================
          SOUS-VUE 3 : FICHE MEMBRE
          ==================================================================== */}
      {subView === 'detail' && selectedMember && (
        <div className="space-y-4">
          {/* En-tête Fiche membre */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSubView('list')}
                className="w-9 h-9 rounded-xl bg-[#FDFBF6] border border-[#E4D3B2] flex items-center justify-center text-[#4C3D28] hover:bg-[#F3E9D6] transition-colors shadow-xs"
                aria-label="Retour à la liste"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E4C27A] to-[#B58328] flex items-center justify-center shadow-sm shrink-0">
                <User className="w-5 h-5 text-[#1F170A]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1F170C] leading-tight">
                  Fiche membre
                </h2>
                <p className="text-xs text-[#6B5A42]">
                  Informations détaillées, prêts et situation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openEditView(selectedMember)}
                className="px-3.5 py-2 rounded-xl bg-[#FDFBF6] border border-[#DFC99D] text-xs font-semibold text-[#3E3120] hover:bg-[#EFE4CE] flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Pencil className="w-3.5 h-3.5 text-[#8A611C]" />
                <span>Modifier</span>
              </button>
              <button
                onClick={() => setSubView('list')}
                className="p-2 rounded-xl bg-[#FDFBF6] border border-[#DFC99D] text-[#4C3D28] hover:bg-[#EFE4CE] shadow-xs"
                aria-label="Plus d'actions"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carte identité du membre */}
          <div className="bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#EFE5D2]">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D6A646] via-[#9E6E1E] to-[#63430E] p-[2px] shadow-md shrink-0">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#B8872C] to-[#744F14] flex items-center justify-center text-[#FFF6DC] font-serif font-bold text-lg">
                    {selectedMember.initials}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1F170C] leading-tight">
                    {selectedMember.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-[#6B5A42]">
                      N° {selectedMember.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        selectedMember.statut === 'Actif'
                          ? 'bg-[#DCF5E3] text-[#1D7A3C] border border-[#B5E7C4]'
                          : 'bg-[#FDE2E1] text-[#B92B27] border border-[#F5BDBA]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          selectedMember.statut === 'Actif' ? 'bg-[#1D7A3C]' : 'bg-[#B92B27]'
                        }`}
                      />
                      {selectedMember.statut}
                    </span>
                  </div>
                </div>
              </div>

              {/* Métadonnées horizontales */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#9B6D1D] shrink-0" />
                  <div>
                    <div className="text-[10.5px] text-[#7D6A4E]">Date d&apos;adhésion</div>
                    <div className="font-bold text-[#22190E]">{selectedMember.dateAdhesion}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#9B6D1D] shrink-0" />
                  <div>
                    <div className="text-[10.5px] text-[#7D6A4E]">Téléphone</div>
                    <div className="font-bold text-[#22190E]">
                      {selectedMember.phonePrefix} {selectedMember.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#9B6D1D] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10.5px] text-[#7D6A4E]">Email</div>
                    <div className="font-bold text-[#22190E] truncate">{selectedMember.email}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sous-onglets de la fiche */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'overview', label: "Vue d'ensemble" },
                { id: 'prets', label: `Prêts (${selectedMember.pretsCount})` },
                { id: 'cotisations', label: 'Cotisations (Aperçu)' },
                { id: 'historique', label: 'Historique' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDetailTab(tab.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    detailTab === tab.id
                      ? 'bg-gradient-to-r from-[#8C6117] to-[#B68326] text-[#FFF8EA] shadow-xs'
                      : 'bg-[#F5EFE3] text-[#4C3D28] border border-[#E4D4B4] hover:bg-[#EFE4CE]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contenu selon l'onglet de la fiche */}
          {detailTab === 'overview' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Gauche : Informations du membre */}
              <div className="lg:col-span-6 bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#EFE5D2]">
                  <User className="w-4 h-4 text-[#9B6D1D]" />
                  <h3 className="text-sm font-bold text-[#22190E]">Informations du membre</h3>
                </div>

                <div className="divide-y divide-[#F1E8D7] text-xs">
                  {[
                    { icon: User, label: 'Nom complet', value: selectedMember.name },
                    { icon: Users, label: 'Sexe', value: selectedMember.sexe || 'Masculin' },
                    { icon: Calendar, label: 'Date de naissance', value: selectedMember.dateNaissance || '-' },
                    { icon: CreditCard, label: "Pièce d'identité", value: selectedMember.pieceNumero || '-' },
                    { icon: FileText, label: 'Notes', value: selectedMember.notes || '-' }
                  ].map((row, idx) => {
                    const Icon = row.icon;
                    return (
                      <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-[#6B5A42]">
                          <Icon className="w-3.5 h-3.5 text-[#9B7228]" />
                          <span>{row.label}</span>
                        </div>
                        <span className="font-bold text-[#22190E] text-right">{row.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Droite : Situations prêts + Dernière activité */}
              <div className="lg:col-span-6 space-y-4">
                {/* Situations prêts */}
                <div className="bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#9B6D1D]" />
                    <h3 className="text-sm font-bold text-[#22190E]">Situations prêts</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-gradient-to-r from-[#F9F0DC] via-[#F6E8C8] to-[#F9F0DC] border border-[#E6D0A0] p-3.5 text-center">
                    <div>
                      <div className="text-base sm:text-lg font-bold text-[#1F170C]">
                        {selectedMember.pretsCount}
                      </div>
                      <div className="text-[10.5px] text-[#6B5A42]">Prêt(s) en cours</div>
                    </div>
                    <div className="border-x border-[#DFC793] px-1">
                      <div className="text-base sm:text-lg font-bold text-[#1F170C]">
                        {formatEuroDecimal(selectedMember.pretsMontantTotal)}
                      </div>
                      <div className="text-[10.5px] text-[#6B5A42]">Montant total</div>
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold text-[#1F170C]">
                        {formatEuroDecimal(selectedMember.interetMensuel)}
                      </div>
                      <div className="text-[10.5px] text-[#6B5A42]">Intérêt mensuel (actuel)</div>
                    </div>
                  </div>
                </div>

                {/* Dernière activité */}
                <div className="bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#9B6D1D]" />
                    <h3 className="text-sm font-bold text-[#22190E]">Dernière activité</h3>
                  </div>

                  <div className="space-y-3 pl-1">
                    {(selectedMember.activites || []).map((act, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        <span
                          className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${
                            act.active
                              ? 'bg-[#1D7A3C] ring-4 ring-[#DCF5E3]'
                              : 'bg-[#A89B86] ring-4 ring-[#EFE8DC]'
                          }`}
                        />
                        <div className="text-[#4C3D28] leading-relaxed">
                          <span className="font-bold text-[#22190E]">{act.date}</span> - {act.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Autres sous-onglets de la fiche membre */
            <div className="bg-[#FDFBF6] border border-[#E4D3B2] rounded-2xl p-5 shadow-xs text-xs text-[#4C3D28] space-y-2">
              <div className="font-bold text-sm text-[#22190E]">
                {detailTab === 'prets'
                  ? `Prêts de ${selectedMember.name}`
                  : detailTab === 'cotisations'
                  ? `Cotisations cumulées : ${selectedMember.cotisations}`
                  : `Historique complet de ${selectedMember.name}`}
              </div>
              <p className="text-[#6B5A42]">
                {detailTab === 'prets'
                  ? selectedMember.pretsCount > 0
                    ? `${selectedMember.pretsCount} prêt(s) actif(s) pour un encours total de ${formatEuroDecimal(
                        selectedMember.pretsMontantTotal
                      )} (intérêt mensuel : ${formatEuroDecimal(selectedMember.interetMensuel)}).`
                    : 'Aucun prêt en cours pour ce membre.'
                  : detailTab === 'cotisations'
                  ? `Total des cotisations enregistrées depuis le ${selectedMember.dateAdhesion} : ${selectedMember.cotisations}.`
                  : `Dernières opérations enregistrées : ${(selectedMember.activites || []).length} événement(s).`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { MembersModule };
