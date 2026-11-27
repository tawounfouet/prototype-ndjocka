# Les Amis du NDJOCKA - Prototype React

Prototype modulaire **frontend uniquement**, consolidant V0, V1, V2, V3 Admin, V4 et V4 v2.

## Démarrer

Prérequis : Node.js 22 et npm.

```bash
npm install
npm run dev
```

Qualité : `npm run typecheck`, `npm run lint`, `npm test` et `npm run build`.

## Architecture

- `src/App.jsx`: composition des parcours desktop, membre mobile et duo
- `src/app/model/usePrototypeData.js`: état partagé du prototype
- `src/features/members`: création, liste, édition et fiche membre
- `src/features/loans`: création de prêt et détail avec projection
- `src/features/settings`: paramètres de la tontine
- `src/features/dashboard`: dashboard, graphiques et navigation admin
- `src/features/member-area`: aperçu membre mobile
- `src/features/operations`: modale d'opérations rapides
- `src/shared/ui`: identité NDJOCKA et composants visuels transversaux
- `src/shared/lib`: formats et utilitaires
- `src/data`: jeux de données fictifs

## Limites importantes

**Ce dépôt contient une maquette interactive, et non une application financière de production.**

- Les données sont fictives, en mémoire, et réinitialisées au rechargement.
- Aucun backend, stockage, authentification ou contrôle d'autorisation n'est intégré.
- Certaines statistiques et notifications sont des données de démonstration fixes.
- Les paramètres sauvegardés dans l'interface ne sont pas persistés.
- Les projections de prêt utilisent des intérêts simples mensuels, sans gestion des remboursements, frais, impayés ou règles comptables.
- La convention de devise, les règles métier et la validation fonctionnelle restent à confirmer avant toute production.

## Historique de consolidation

Voir [`docs/MIGRATION.md`](docs/MIGRATION.md) pour les sources et les compromis de la refactorisation.