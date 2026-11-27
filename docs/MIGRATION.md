# Consolidation des prototypes NDJOCKA

## Sources analysées

1. `v0` : tableau de bord, espace membre et opérations
2. `v1` : module Membres (liste, création, fiche, édition)
3. `v2-pret` : assistant de création de prêt
4. `3-admin` : configuration et administration
5. `v4-pret-details` : détail de prêt et projection
6. `v4-pret-details_v2` : grille de projection agrandie

La base fonctionnelle retenue est **V4 v2**. Les autres fichiers sont des étapes historiques, non six implémentations indépendantes. Les références originales sont les fichiers TSX fournis dans la conversation, conservés hors du code applicatif pour éviter la duplication.

## Portée de cette refactorisation

- Organisation par fonctionnalité (`features`) et composants partagés.
- Configuration Vite, Tailwind et scripts de qualité.
- Extraction des données fictives et des fonctions de calcul et formatage.
- État inter-écrans isolé dans un hook dédié.
- Conservation de l'expérience interactive desktop/mobile/duo, du branding et des parcours de création.
- Contrôles de validité additionnels avant création des prêts.

## Décisions non prises

- Schéma de données réel, devise officielle et modèle comptable
- Authentification, rôles, accès membre et politiques de confidentialité
- Contrats API, backend, stockage et audit financier
- Persistence des paramètres et référentiel des membres
- Workflow de validation des prêts, remboursements et sanctions

**Go/No-Go :** livrable adapté à une démonstration et à l'évolution front-end ; No-Go pour la production financière tant que les contrats métier, sécurité et tests end-to-end ne sont pas validés.