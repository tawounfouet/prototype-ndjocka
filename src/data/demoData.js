import { Home, Users, Coins, HandCoins, RefreshCw, AlertTriangle, Wallet, BarChart3, Settings } from 'lucide-react';

// Jeux de donnees fictifs. Ne pas utiliser en production.
export const INITIAL_CAISSE_DATA = [
  { month: 'Jan', montant: 52000 },
  { month: 'Fév', montant: 82000 },
  { month: 'Mar', montant: 102000 },
  { month: 'Avr', montant: 118000 },
  { month: 'Mai', montant: 132000 },
  { month: 'Juin', montant: 150000 },
  { month: 'Juil', montant: 168000 },
  { month: 'Aoû', montant: 186000 },
  { month: 'Sep', montant: 200000 },
  { month: 'Oct', montant: 212000 },
  { month: 'Nov', montant: 234000 }
];

export const REPARTITION_DATA = [
  { name: 'Tontine', percent: 60, value: 150000, color: '#C6922C' },
  { name: 'Prêts', percent: 32, value: 80000, color: '#69451A' },
  { name: 'Épargne', percent: 5, value: 12500, color: '#E8C57B' },
  { name: 'Sanctions', percent: 3, value: 7500, color: '#8C8175' }
];

export const INITIAL_OPERATIONS = [
  {
    id: 1,
    date: '26 nov. 2026',
    type: 'pret',
    label: 'Prêt accordé',
    member: 'K. Martin',
    amount: 1000,
    amountDisplay: '1 000 €',
    amountTone: 'red',
    status: 'Validé',
    statusTone: 'green'
  },
  {
    id: 2,
    date: '25 nov. 2026',
    type: 'cotisation',
    label: 'Cotisation',
    member: 'A. Ngono',
    amount: 2500,
    amountDisplay: '2 500 €',
    amountTone: 'green',
    status: 'Enregistré',
    statusTone: 'amber'
  },
  {
    id: 3,
    date: '24 nov. 2026',
    type: 'remboursement',
    label: 'Remboursement',
    member: 'P. Djoum',
    amount: 500,
    amountDisplay: '500 €',
    amountTone: 'green',
    status: 'Enregistré',
    statusTone: 'amber'
  },
  {
    id: 4,
    date: '24 nov. 2026',
    type: 'sanction',
    label: 'Retard (sanction)',
    member: 'C. Mvogo',
    amount: 10,
    amountDisplay: '10 €',
    amountTone: 'red',
    status: 'À payer',
    statusTone: 'red'
  }
];

export const MOBILE_INITIAL_OPERATIONS = [
  {
    id: 'm1',
    type: 'pret',
    label: 'Prêt accordé',
    date: '26 nov. 2026',
    amount: '1 000 €',
    tone: 'green'
  },
  {
    id: 'm2',
    type: 'cotisation',
    label: 'Cotisation',
    date: '25 nov. 2026',
    amount: '2 500 €',
    tone: 'green'
  },
  {
    id: 'm3',
    type: 'remboursement',
    label: 'Remboursement',
    date: '18 nov. 2026',
    amount: '500 €',
    tone: 'green'
  }
];

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Tableau de bord', icon: Home },
  { id: 'membres', label: 'Membres', icon: Users },
  { id: 'cotisations', label: 'Cotisations', icon: Coins },
  { id: 'tontine', label: 'Tontine', icon: Users },
  { id: 'prets', label: 'Prêts', icon: HandCoins },
  { id: 'remboursements', label: 'Remboursements', icon: RefreshCw },
  { id: 'retards', label: 'Retards & sanctions', icon: AlertTriangle },
  { id: 'caisse', label: 'Caisse / Trésorerie', icon: Wallet },
  { id: 'rapports', label: 'Rapports', icon: BarChart3 },
  { id: 'parametres', label: 'Paramètres', icon: Settings }
];

export const SAMPLE_MEMBERS = [
  {
    id: 'M-001',
    initials: 'KM',
    nom: 'Martin',
    prenom: 'K.',
    name: 'K. Martin',
    sexe: 'Masculin',
    dateNaissance: '14 mars 1992',
    pieceType: 'Carte nationale',
    pieceNumero: 'CNI0987654321',
    phonePrefix: '+237',
    phone: '6 99 12 34 56',
    email: 'k.martin@example.com',
    dateAdhesion: '15 janv. 2023',
    statut: 'Actif',
    pretsCount: 1,
    pretsMontantTotal: 1000,
    interetMensuel: 50,
    cotisations: '30 000 €',
    prets: '1 000 €',
    role: 'Membre depuis 2023',
    notes: '',
    activites: [
      { date: '26 nov. 2026', text: "Création d'un prêt de 1 000,00 € (5,00 %).", active: true },
      { date: '15 janv. 2023', text: 'Adhésion à la tontine.', active: false }
    ]
  },
  {
    id: 'M-002',
    initials: 'AN',
    nom: 'Ngono',
    prenom: 'A.',
    name: 'A. Ngono',
    sexe: 'Féminin',
    dateNaissance: '22 août 1989',
    pieceType: 'Carte nationale',
    pieceNumero: 'CNI0944521109',
    phonePrefix: '+237',
    phone: '6 77 45 23 10',
    email: 'a.ngono@example.com',
    dateAdhesion: '20 janv. 2023',
    statut: 'Actif',
    pretsCount: 0,
    pretsMontantTotal: 0,
    interetMensuel: 0,
    cotisations: '42 500 €',
    prets: '0 €',
    role: 'Membre depuis 2023',
    notes: 'Membre très régulière dans ses cotisations.',
    activites: [
      { date: '25 nov. 2026', text: 'Cotisation mensuelle de 2 500,00 € enregistrée.', active: true },
      { date: '20 janv. 2023', text: 'Adhésion à la tontine.', active: false }
    ]
  },
  {
    id: 'M-003',
    initials: 'PD',
    nom: 'Djoum',
    prenom: 'P.',
    name: 'P. Djoum',
    sexe: 'Masculin',
    dateNaissance: '05 mai 1987',
    pieceType: 'Passeport',
    pieceNumero: 'PP88210459',
    phonePrefix: '+237',
    phone: '6 93 21 45 67',
    email: 'p.djoum@example.com',
    dateAdhesion: '02 févr. 2023',
    statut: 'Actif',
    pretsCount: 2,
    pretsMontantTotal: 2500,
    interetMensuel: 125,
    cotisations: '21 000 €',
    prets: '2 500 €',
    role: 'Membre depuis 2023',
    notes: '',
    activites: [
      { date: '24 nov. 2026', text: 'Remboursement partiel de 500,00 € validé.', active: true },
      { date: '02 févr. 2023', text: 'Adhésion à la tontine.', active: false }
    ]
  },
  {
    id: 'M-004',
    initials: 'CM',
    nom: 'Mvogo',
    prenom: 'C.',
    name: 'C. Mvogo',
    sexe: 'Masculin',
    dateNaissance: '19 nov. 1994',
    pieceType: 'Carte nationale',
    pieceNumero: 'CNI0754128890',
    phonePrefix: '+237',
    phone: '6 88 76 54 32',
    email: 'c.mvogo@example.com',
    dateAdhesion: '05 févr. 2023',
    statut: 'Actif',
    pretsCount: 0,
    pretsMontantTotal: 0,
    interetMensuel: 0,
    cotisations: '14 000 €',
    prets: '0 €',
    role: 'Membre depuis 2023',
    notes: 'Sanction de retard de 10 € en attente.',
    activites: [
      { date: '24 nov. 2026', text: 'Sanction de retard de 10,00 € appliquée.', active: true },
      { date: '05 févr. 2023', text: 'Adhésion à la tontine.', active: false }
    ]
  },
  {
    id: 'M-005',
    initials: 'YO',
    nom: 'Ouedraogo',
    prenom: 'Y.',
    name: 'Y. Ouedraogo',
    sexe: 'Masculin',
    dateNaissance: '11 janv. 1990',
    pieceType: 'Carte nationale',
    pieceNumero: 'CNI0811234567',
    phonePrefix: '+237',
    phone: '6 95 67 89 01',
    email: 'y.ouedraogo@example.com',
    dateAdhesion: '10 févr. 2023',
    statut: 'Actif',
    pretsCount: 1,
    pretsMontantTotal: 1500,
    interetMensuel: 75,
    cotisations: '28 000 €',
    prets: '1 500 €',
    role: 'Membre depuis 2023',
    notes: '',
    activites: [
      { date: '12 nov. 2026', text: "Création d'un prêt de 1 500,00 € (5,00 %).", active: true },
      { date: '10 févr. 2023', text: 'Adhésion à la tontine.', active: false }
    ]
  },
  {
    id: 'M-006',
    initials: 'EB',
    nom: 'Bikoi',
    prenom: 'E.',
    name: 'E. Bikoi',
    sexe: 'Féminin',
    dateNaissance: '03 avr. 1991',
    pieceType: 'Carte nationale',
    pieceNumero: 'CNI0619874321',
    phonePrefix: '+237',
    phone: '6 71 22 90 14',
    email: 'e.bikoi@example.com',
    dateAdhesion: '18 mars 2023',
    statut: 'Inactif',
    pretsCount: 0,
    pretsMontantTotal: 0,
    interetMensuel: 0,
    cotisations: '9 500 €',
    prets: '0 €',
    role: 'Membre depuis 2023',
    notes: 'Compte mis en pause temporairement.',
    activites: [
      { date: '18 mars 2023', text: 'Adhésion à la tontine.', active: false }
    ]
  }
];
