import React, { useState } from 'react';
import { Users, Coins, Settings, Bell, CheckCircle2, X, Check, Phone, Mail, ChevronRight, FileText, Clock, Info, Database, SlidersHorizontal, Upload, MapPin, Globe, Building2, Languages, RotateCcw, Zap, Layers, Download } from 'lucide-react';
import { NdjockaLogo } from "../../shared/ui/NdjockaLogo";

const DEFAULT_SETTINGS = {
  tontineName: 'Les Amis du Ndjocka',
  description:
    'Tontine de solidarité et de financement entre membres, « Les Amis du Ndjocka ».',
  contactEmail: 'contact@ndjocka.org',
  contactPhone: '+33 6 12 34 56 78',
  country: 'France',
  city: 'Courbevoie',
  address: '12 Avenue des Mimosas, 92400 Courbevoie',
  currency: 'EUR (€)',
  timezone: 'Europe/Paris (UTC +01:00)',
  language: 'Français',
  // Onglet Finance (prêts)
  defaultLoanRate: '5.00',
  defaultProjectionMonths: '12',
  maxLoanAmount: '5000',
  // Onglet Notifications
  notifNewLoan: true,
  notifLatePayment: true,
  notifMonthlyDigest: false,
  // Onglet Système
  maintenanceMode: false,
  auditLogsEnabled: true
};

const SettingsModule = () => {
  const [settingsTab, setSettingsTab] = useState('general');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [savedBanner, setSavedBanner] = useState(null);
  const [logoPreviewName, setLogoPreviewName] = useState(null);

  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'users', label: 'Utilisateurs & accès', icon: Users },
    { id: 'finance', label: 'Finance (prêts)', icon: Coins },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'backup', label: 'Sauvegarde & données', icon: Database },
    { id: 'system', label: 'Système', icon: SlidersHorizontal }
  ];

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setLogoPreviewName(null);
    setSavedBanner('Les paramètres ont été réinitialisés aux valeurs par défaut.');
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    setSavedBanner('Les modifications ont bien été enregistrées.');
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreviewName(file.name);
      setSavedBanner(`Nouveau logo sélectionné : ${file.name}`);
    }
  };

  const quickActions = [
    {
      label: 'Gérer les utilisateurs et les rôles',
      icon: Users,
      iconBg: 'bg-[#FBF0D9] text-[#9B6D1D]',
      targetTab: 'users'
    },
    {
      label: 'Configurer les règles de prêts',
      icon: Coins,
      iconBg: 'bg-[#F8E7C2] text-[#A4721C]',
      targetTab: 'finance'
    },
    {
      label: 'Paramétrer les notifications',
      icon: Bell,
      iconBg: 'bg-[#FEF3D6] text-[#B8821D]',
      targetTab: 'notifications'
    },
    {
      label: 'Sauvegarder les données',
      icon: Database,
      iconBg: 'bg-[#F7E8C8] text-[#8E6214]',
      targetTab: 'backup'
    },
    {
      label: "Consulter les journaux d'activité",
      icon: FileText,
      iconBg: 'bg-[#F5ECD9] text-[#8A621B]',
      targetTab: 'system'
    }
  ];

  return (
    <div className="space-y-4">
      {/* En-tête de la page Paramètres */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7A5311] via-[#593B0B] to-[#3B2606] flex items-center justify-center shadow-md border-2 border-[#E3BE68] shrink-0">
            <Settings className="w-6 h-6 text-[#FCE7A2]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F170C] leading-tight">
                Paramètres
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F7E7C2] border border-[#E2C27A] text-[11px] font-bold text-[#6E4A10]">
                POC – V1.0
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-[#6B5A42]">
              Configurer la tontine, les règles, les accès et le fonctionnement de l&apos;application.
            </p>
          </div>
        </div>
      </div>

      {/* Barre des 6 onglets horizontaux */}
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = settingsTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setSettingsTab(tab.id);
                setSavedBanner(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border ${
                isActive
                  ? 'bg-gradient-to-b from-[#F9E3A0] via-[#ECC668] to-[#DFAF45] text-[#241807] border-[#D4A036] shadow-sm font-bold'
                  : 'bg-[#FFFDF9] text-[#4C3D28] border-[#E4D4B4] hover:bg-[#FAF2E1] hover:border-[#D4B882]'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? 'text-[#241807]' : 'text-[#6B5A42]'
                }`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bandeau de confirmation */}
      {savedBanner && (
        <div className="rounded-xl bg-[#ECF9F0] border border-[#9ADBB0] px-4 py-2.5 flex items-center justify-between gap-3 text-xs text-[#175B2E]">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#1D7A3C] shrink-0" />
            <span>{savedBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setSavedBanner(null)}
            className="p-1 rounded-md hover:bg-[#D5F2DF]"
            aria-label="Fermer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Layout 2 colonnes : Formulaire principal (8 cols) + Panneaux d'infos (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Colonne Principale */}
        <div className="xl:col-span-8">
          {settingsTab === 'general' && (
            <form
              onSubmit={handleSave}
              className="bg-[#FFFDF9] border border-[#E4D3B2] rounded-2xl p-5 sm:p-6 shadow-xs space-y-5"
            >
              {/* Titre carte */}
              <div className="flex items-start gap-2.5 pb-3 border-b border-[#F0E6D2]">
                <FileText className="w-5 h-5 text-[#9B6D1D] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[15px] font-bold text-[#1F170C] leading-tight">
                    Paramètres généraux de la tontine
                  </h3>
                  <p className="text-xs text-[#736045]">
                    Informations de base et identité de la tontine.
                  </p>
                </div>
              </div>

              {/* Bloc Logo + Nom & Description */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Carte Logo sombre + Bouton Changer le logo */}
                <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-3.5">
                  <div className="w-36 h-36 rounded-2xl bg-gradient-to-b from-[#0E1624] via-[#0A101B] to-[#060910] border border-[#D4A441]/55 shadow-md flex flex-col items-center justify-center p-3 text-center shrink-0">
                    <NdjockaLogo size="md" showPalmLeft={true} />
                    <div className="mt-1.5 leading-tight">
                      <div className="text-[7.5px] tracking-[0.14em] text-[#E6C26E] uppercase">
                        LES AMIS DU
                      </div>
                      <div className="font-serif text-[13px] font-bold text-gold-gradient tracking-wide">
                        NDJOCKA
                      </div>
                      <div className="text-[7px] tracking-[0.22em] text-[#D7BE8A] mt-0.5">
                        - TONTINE -
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left md:text-center lg:text-left">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF6EE] hover:bg-[#F1E6D0] border border-[#DFC99D] text-xs font-semibold text-[#2B2012] cursor-pointer transition-colors shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-[#7A5311]" />
                      <span>Changer le logo</span>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.svg"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                    <div className="text-[11px] text-[#7D6A4E] leading-snug">
                      <div>Formats : JPG, PNG, SVG</div>
                      <div>Taille recommandée : 512 × 512 px</div>
                      {logoPreviewName && (
                        <div className="text-[#1D7A3C] font-semibold mt-0.5 truncate max-w-[160px]">
                          {logoPreviewName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Nom de la tontine + Description */}
                <div className="md:col-span-7 space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#3E3120] mb-1.5">
                      Nom de la tontine <span className="text-[#C53030]">*</span>
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-[#7D6A4E] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={settings.tontineName}
                        onChange={(e) =>
                          setSettings({ ...settings, tontineName: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-sm font-medium text-[#22190E] focus:outline-none focus:border-[#B68122]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3E3120] mb-1.5">
                      Description{' '}
                      <span className="font-normal text-[#8C7756]">(optionnelle)</span>
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-[#7D6A4E] absolute left-3 top-3" />
                      <textarea
                        rows={3}
                        maxLength={250}
                        value={settings.description}
                        onChange={(e) =>
                          setSettings({ ...settings, description: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-xs sm:text-[13px] text-[#22190E] focus:outline-none focus:border-[#B68122] resize-none leading-relaxed"
                      />
                    </div>
                    <div className="text-right text-[11px] text-[#8C7756] mt-0.5">
                      {settings.description.length} / 250
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloc Coordonnées de contact + Localisation */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-4 border-t border-[#F0E6D2]">
                {/* Coordonnées de contact */}
                <div className="md:col-span-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#22190E]">
                    <Phone className="w-4 h-4 text-[#9B6D1D]" />
                    <span>Coordonnées de contact</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                      Email de contact
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#7D6A4E] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) =>
                          setSettings({ ...settings, contactEmail: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-xs sm:text-[13px] text-[#22190E] focus:outline-none focus:border-[#B68122]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#7D6A4E] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={settings.contactPhone}
                        onChange={(e) =>
                          setSettings({ ...settings, contactPhone: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-xs sm:text-[13px] text-[#22190E] focus:outline-none focus:border-[#B68122]"
                      />
                    </div>
                  </div>
                </div>

                {/* Localisation */}
                <div className="md:col-span-7 space-y-3 md:border-l md:border-[#F0E6D2] md:pl-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#22190E]">
                    <MapPin className="w-4 h-4 text-[#9B6D1D]" />
                    <span>Localisation</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                        Pays <span className="text-[#C53030]">*</span>
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-[#7D6A4E] absolute left-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={settings.country}
                          onChange={(e) =>
                            setSettings({ ...settings, country: e.target.value })
                          }
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-xs sm:text-[13px] text-[#22190E] focus:outline-none focus:border-[#B68122]"
                        >
                          <option value="France">France</option>
                          <option value="Cameroun">Cameroun</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                        Ville
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-[#7D6A4E] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={settings.city}
                          onChange={(e) =>
                            setSettings({ ...settings, city: e.target.value })
                          }
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-xs sm:text-[13px] text-[#22190E] focus:outline-none focus:border-[#B68122]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                      Adresse{' '}
                      <span className="font-normal text-[#8C7756]">(optionnelle)</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#7D6A4E] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) =>
                          setSettings({ ...settings, address: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-xs sm:text-[13px] text-[#22190E] focus:outline-none focus:border-[#B68122]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloc Paramètres globaux */}
              <div className="pt-4 border-t border-[#F0E6D2] space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#22190E]">
                  <SlidersHorizontal className="w-4 h-4 text-[#9B6D1D]" />
                  <span>Paramètres globaux</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                      Devise <span className="text-[#C53030]">*</span>
                    </label>
                    <div className="relative">
                      <Coins className="w-4 h-4 text-[#7D6A4E] absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={settings.currency}
                        onChange={(e) =>
                          setSettings({ ...settings, currency: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-xs sm:text-[13px] font-medium text-[#22190E] focus:outline-none focus:border-[#B68122]"
                      >
                        <option value="EUR (€)">EUR (€)</option>
                        <option value="XAF (FCFA)">XAF (FCFA)</option>
                        <option value="USD ($)">USD ($)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                      Fuseau horaire <span className="text-[#C53030]">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-[#7D6A4E] absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={settings.timezone}
                        onChange={(e) =>
                          setSettings({ ...settings, timezone: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-xs sm:text-[13px] font-medium text-[#22190E] focus:outline-none focus:border-[#B68122]"
                      >
                        <option value="Europe/Paris (UTC +01:00)">
                          Europe/Paris (UTC +01:00)
                        </option>
                        <option value="Africa/Douala (UTC +01:00)">
                          Africa/Douala (UTC +01:00)
                        </option>
                        <option value="UTC (UTC +00:00)">UTC (UTC +00:00)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                      Langue de l&apos;interface
                    </label>
                    <div className="relative">
                      <Languages className="w-4 h-4 text-[#7D6A4E] absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          setSettings({ ...settings, language: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-xs sm:text-[13px] font-medium text-[#22190E] focus:outline-none focus:border-[#B68122]"
                      >
                        <option value="Français">Français</option>
                        <option value="English">English</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barre de boutons inférieure */}
              <div className="pt-4 border-t border-[#F0E6D2] flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-[#FAF6EE] hover:bg-[#EFE4CE] border border-[#DFC99D] text-xs font-semibold text-[#3E3120] flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B88524] via-[#9A6A16] to-[#7B520D] text-[#FFF9EC] text-xs font-bold flex items-center gap-2 shadow-sm hover:brightness-110 active:scale-[0.99] transition-all"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Enregistrer les modifications</span>
                </button>
              </div>
            </form>
          )}

          {/* Onglet Utilisateurs & accès */}
          {settingsTab === 'users' && (
            <div className="bg-[#FFFDF9] border border-[#E4D3B2] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D2]">
                <div>
                  <h3 className="text-[15px] font-bold text-[#1F170C]">
                    Utilisateurs &amp; accès
                  </h3>
                  <p className="text-xs text-[#736045]">
                    Gérer les administrateurs et les niveaux d&apos;autorisation.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#F5ECD9] text-xs font-semibold text-[#6E4A10]">
                  3 comptes actifs
                </span>
              </div>
              <div className="divide-y divide-[#F0E6D2] text-xs">
                {[
                  { name: 'Thomas Awounfoet', role: 'Administrateur', email: 'thomas.a@ndjocka.org', active: true },
                  { name: 'K. Martin', role: 'Trésorier adjoint', email: 'k.martin@example.com', active: true },
                  { name: 'A. Ngono', role: 'Secrétaire', email: 'a.ngono@example.com', active: true }
                ].map((u, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-[#22190E] text-sm">{u.name}</div>
                      <div className="text-[#736045]">{u.email}</div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#DCF5E3] text-[#1D7A3C] font-semibold">
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Onglet Finance (prêts) */}
          {settingsTab === 'finance' && (
            <form
              onSubmit={handleSave}
              className="bg-[#FFFDF9] border border-[#E4D3B2] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4"
            >
              <div className="pb-3 border-b border-[#F0E6D2]">
                <h3 className="text-[15px] font-bold text-[#1F170C]">
                  Règles financières &amp; prêts
                </h3>
                <p className="text-xs text-[#736045]">
                  Paramètres par défaut utilisés lors de la création d&apos;un nouveau prêt.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                    Taux mensuel par défaut (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={settings.defaultLoanRate}
                    onChange={(e) =>
                      setSettings({ ...settings, defaultLoanRate: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-sm font-bold text-[#22190E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                    Durée projection (mois)
                  </label>
                  <input
                    type="number"
                    value={settings.defaultProjectionMonths}
                    onChange={(e) =>
                      setSettings({ ...settings, defaultProjectionMonths: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-sm font-bold text-[#22190E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4C3D28] mb-1">
                    Plafond par prêt (€)
                  </label>
                  <input
                    type="number"
                    value={settings.maxLoanAmount}
                    onChange={(e) =>
                      setSettings({ ...settings, maxLoanAmount: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] text-sm font-bold text-[#22190E]"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B88524] to-[#7B520D] text-[#FFF9EC] text-xs font-bold flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer les règles</span>
                </button>
              </div>
            </form>
          )}

          {/* Onglet Notifications */}
          {settingsTab === 'notifications' && (
            <div className="bg-[#FFFDF9] border border-[#E4D3B2] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="pb-3 border-b border-[#F0E6D2]">
                <h3 className="text-[15px] font-bold text-[#1F170C]">Notifications</h3>
                <p className="text-xs text-[#736045]">
                  Choisissez les alertes envoyées par email et dans l&apos;application.
                </p>
              </div>
              {[
                { key: 'notifNewLoan', label: 'Alerte lors de la création d’un nouveau prêt' },
                { key: 'notifLatePayment', label: 'Rappel automatique en cas de retard / sanction' },
                { key: 'notifMonthlyDigest', label: 'Rapport mensuel synthétique de la caisse' }
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between gap-3 py-2.5 border-b border-[#F4ECDC] last:border-0 cursor-pointer text-xs sm:text-sm text-[#2B2012]"
                >
                  <span className="font-medium">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) =>
                      setSettings({ ...settings, [item.key]: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#9E6E1E]"
                  />
                </label>
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B88524] to-[#7B520D] text-[#FFF9EC] text-xs font-bold flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer</span>
                </button>
              </div>
            </div>
          )}

          {/* Onglet Sauvegarde & données */}
          {settingsTab === 'backup' && (
            <div className="bg-[#FFFDF9] border border-[#E4D3B2] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="pb-3 border-b border-[#F0E6D2]">
                <h3 className="text-[15px] font-bold text-[#1F170C]">
                  Sauvegarde &amp; données
                </h3>
                <p className="text-xs text-[#736045]">
                  Exportez une copie complète des membres, prêts et opérations.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF4E8] border border-[#E4D3B2] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-[#4C3D28]">
                  <div className="font-bold text-[#1F170C] text-sm">
                    Dernière sauvegarde automatique
                  </div>
                  <div>26 nov. 2026 à 15:42 - Format JSON / CSV</div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSavedBanner('Export de sauvegarde généré avec succès (POC – V1.0).')
                  }
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B88524] to-[#7B520D] text-[#FFF9EC] text-xs font-bold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Lancer une sauvegarde</span>
                </button>
              </div>
            </div>
          )}

          {/* Onglet Système */}
          {settingsTab === 'system' && (
            <div className="bg-[#FFFDF9] border border-[#E4D3B2] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="pb-3 border-b border-[#F0E6D2]">
                <h3 className="text-[15px] font-bold text-[#1F170C]">
                  Système &amp; journaux d&apos;activité
                </h3>
                <p className="text-xs text-[#736045]">
                  Options techniques et suivi des événements récents.
                </p>
              </div>
              <div className="space-y-2 text-xs text-[#4C3D28]">
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE5D2] flex justify-between">
                  <span>26 nov. 2026 à 15:42 - Mise à jour des paramètres généraux</span>
                  <span className="font-bold text-[#1D7A3C]">OK</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE5D2] flex justify-between">
                  <span>26 nov. 2026 à 14:15 - Création du prêt M-001 (1 000,00 €)</span>
                  <span className="font-bold text-[#1D7A3C]">OK</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Colonne Latérale Droite (3 cartes d'informations) */}
        <div className="xl:col-span-4 space-y-4">
          {/* Carte 1 : À propos de cette section */}
          <div className="bg-[#FFFDF9] border border-[#E4D3B2] rounded-2xl overflow-hidden shadow-xs">
            <div className="px-4 py-3 bg-[#FBF2DB] border-b border-[#EFE0B8] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#9B6D1D]" />
              <h3 className="text-sm font-bold text-[#22190E]">
                À propos de cette section
              </h3>
            </div>
            <div className="p-4 space-y-2.5 text-xs text-[#4C3D28] leading-relaxed">
              <p>
                Configurez les informations générales de la tontine et les paramètres de
                fonctionnement principaux.
              </p>
              <p>
                Les autres onglets permettent de gérer les accès, les règles de prêts, les
                notifications, les sauvegardes et les options système.
              </p>
            </div>
          </div>

          {/* Carte 2 : Actions rapides */}
          <div className="bg-[#FFFDF9] border border-[#E4D3B2] rounded-2xl overflow-hidden shadow-xs">
            <div className="px-4 py-3 bg-[#ECF7F2] border-b border-[#D2EBDF] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#1D7A4C]" />
              <h3 className="text-sm font-bold text-[#22190E]">Actions rapides</h3>
            </div>
            <div className="divide-y divide-[#F3EBDC]">
              {quickActions.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSettingsTab(act.targetTab)}
                    className="w-full px-4 py-2.5 flex items-center justify-between gap-2.5 hover:bg-[#FAF4E8] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${act.iconBg}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-semibold text-[#2B2012] truncate">
                        {act.label}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8C7756] shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carte 3 : Informations de l'environnement */}
          <div className="bg-[#FFFDF9] border border-[#E4D3B2] rounded-2xl overflow-hidden shadow-xs">
            <div className="px-4 py-3 bg-[#EEF2FC] border-b border-[#D6E0F7] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#3B5998]" />
              <h3 className="text-sm font-bold text-[#22190E]">
                Informations de l&apos;environnement
              </h3>
            </div>
            <div className="p-4 divide-y divide-[#F3EBDC] text-xs">
              <div className="py-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[#6B5A42]">
                  <Info className="w-3.5 h-3.5 text-[#5C6F94]" />
                  Version de l&apos;application
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FBF0D5] border border-[#E2C27A] font-bold text-[#6E4A10]">
                  POC – V1.0
                </span>
              </div>
              <div className="py-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[#6B5A42]">
                  <Layers className="w-3.5 h-3.5 text-[#5C6F94]" />
                  Périmètre fonctionnel
                </span>
                <span className="font-bold text-[#22190E] text-right">
                  Membres • Prêts • Intérêts
                </span>
              </div>
              <div className="py-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[#6B5A42]">
                  <Clock className="w-3.5 h-3.5 text-[#5C6F94]" />
                  Dernière mise à jour
                </span>
                <span className="font-bold text-[#22190E] text-right">
                  26 nov. 2026 à 15:42
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SettingsModule };
