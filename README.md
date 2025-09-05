# react-hooks

Ce projet contient une collection de hooks React personnalisés.

## Installation

```bash
npm install @fzed51/react-hooks
```


## Hooks

- [useRenderCount](./doc/useRenderCount.md) : Compte et journalise les rendus d’un composant.
- [useRequest & useParametredRequest](./doc/useRequest.md) : Gestion des requêtes asynchrones avec ou sans paramètres.

## Scripts

Voici la liste des scripts disponibles :

- `build` : Compile le projet en CommonJS et ESM
- `build:cjs` : Compile le projet en CommonJS
- `build:esm` : Compile le projet en ESM
- `lint` : Analyse le code avec ESLint
- `lint:fix` : Corrige automatiquement les erreurs ESLint
- `test` : Lance les tests unitaires avec Jest
- `test:full` : Lance les tests avec affichage détaillé et couverture
- `test:watch` : Lance les tests en mode watch
- `publish` : (script réservé à la publication, à compléter)

## Licence

Ce projet est sous licence MIT.
