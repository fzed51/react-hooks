# Instructions Copilot pour les agents IA

Ce dépôt contient des hooks React personnalisés pour un certain nombre de choses. Pour l'instant il y a des hooks pour les requêtes asynchrones et le suivi des rendus.

Suivez ces directives pour être productif et maintenir la cohérence :

## Architecture du projet

- Tout le code source se trouve dans le dossier `src/`. Chaque hook est implémenté dans son propre fichier (ex. : `useRequest.ts`, `useParametredRequest.ts`, `useRenderCount.ts`).
- Si le code d'un hook est trop complexe et nécessite plusieur fichiers, créez un sous-dossier dans `src/` pour ce hook (ex. : `src/useComplexHook/`).
- Chaque hook doit être exporté depuis un fichier `index.ts` dans son dossier.

## Hooks clés & modèles

- `useRenderCount` : Suit et journalise le nombre de rendus d’un composant. Détecte React StrictMode au premier rendu.
  - Utilisation : `useRenderCount('NomDuComposant')` dans un composant.
- `useRequest` : Pour les requêtes asynchrones sans paramètres. Retourne `{ data, loading, error, send, reset, firstLoading }`.
- `useParametredRequest` : Pour les requêtes asynchrones avec paramètres. Retourne la même API que `useRequest`.
- Des exemples d’utilisation sont documentés dans le `README.md`.

## Flux de travail développeur

- **Build :**
  - `npm run build` (génère CJS et ESM)
  - `npm run build:cjs` (CommonJS uniquement)
  - `npm run build:esm` (ESM uniquement)
- **Lint :**
  - `npm run lint` (vérifie le code)
  - `npm run lint:fix` (corrige automatiquement les problèmes)
- **Test :**
  - `npm run test` (tests unitaires avec Jest)
  - `npm run test:full` (résultats détaillés + couverture)
  - `npm run test:watch` (mode surveillance)

## Conventions & modèles

- Tous les hooks retournent une API cohérente : `{ data, loading, error, send, reset, firstLoading }`.
- Privilégier les composants fonctionnels et les hooks ; éviter les composants de classe.
- Utiliser TypeScript pour tous les fichiers sources.
- Respecter les règles ESLint configurées dans `eslint.config.mjs`.
- Les tests doivent être écrits avec Jest (voir `jest.config.js`).
- Les builds sont gérés via plusieurs fichiers `tsconfig` pour la compatibilité CJS/ESM.

## Organisation des tests

Les fichiers de test sont placés dans le même dossier que le code source correspondant.
Pour chaque fichier `fichier.ts`, le test associé se nomme `fichier.spec.ts`.
Exemple : le hook `useRequest.ts` aura son test dans `useRequest.spec.ts` dans le même dossier.

## Points d’intégration

- Pas de librairies d’état externes ; les hooks sont autonomes.
- L’API Fetch est utilisée pour les requêtes asynchrones dans les exemples.
- Le package est publié sous `@fzed51/react-hooks`.

## Références

- Voir le `README.md` pour des exemples d’utilisation et la documentation de l’API.
- Fichiers clés : `src/useRequest.ts`, `src/useParametredRequest.ts`, `src/useRenderCount.ts`, `eslint.config.mjs`, `jest.config.js`, `tsconfig*.json`.

## Règles pour les messages de commit

Respectez le format suivant pour les messages de commit afin d’assurer la clarté et la cohérence de l’historique :

- Utilisez un préfixe indiquant le type de changement : `feat:`, `fix:`, `docs:`, `chore:`, etc.
- Soyez concis et précis : décrivez brièvement la modification apportée.
- Exemple :
  - `feat: add firstLoading state to useRequest and useParametredRequest hooks`
  - `fix: remove unused dependencies from package.json`
- Pour les ajouts de fonctionnalités, commencez par `feat:`.
- Pour les corrections de bugs, commencez par `fix:`.
- Pour les modifications de documentation, commencez par `docs:`.
- Pour les tâches de maintenance ou de configuration, utilisez `chore:`.
- Évitez les messages trop génériques comme `update` ou `changes`.

---

Si certaines conventions ou flux de travail ne sont pas clairs, merci de demander des précisions ou de fournir des retours pour améliorer ces instructions.
