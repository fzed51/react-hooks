# react-hooks

Ce projet contient une collection de hooks React personnalisés.

## Installation

```bash
npm install @fzed51/react-hooks
```

## Hooks
### useRenderCount

Ce hook permet de compter et d'afficher dans la console le nombre de rendus d'un composant React. Il détecte également si le composant est monté en mode StrictMode (utile en développement).

#### Exemple d'utilisation

```tsx
import { useRenderCount } from '@fzed51/react-hooks';

function MyComponent() {
	useRenderCount('MyComponent');
	// ... le reste du composant
	return <div>Mon composant</div>;
}
```

À chaque rendu, le hook affiche dans la console :

```
MyComponent render #1
MyComponent render #2
...
```

En mode StrictMode, le message inclut le flag `[StrictMode]` lors du premier rendu :

```
MyComponent render #1 [StrictMode]
```
### Utilisation des hooks de requête

Ce projet propose deux hooks pour gérer les requêtes asynchrones :

- `useRequest` : pour les requêtes sans paramètres
- `useParametredRequest` : pour les requêtes avec paramètres

#### Exemple d'utilisation


1. Requête sans paramètres

```tsx
import { useEffect } from 'react'
import { useRequest } from '@fzed51/react-hooks';

function getUser() {
	return fetch('/api/user').then((res) => res.json());
}

function useGetUser() {
    return useRequest(getUser)
}

function UserComponent() {
	const { data, loading, error, send, reset } = useGetUser();

    useEffect( () =>  { send() }, [])

	if (loading) return <div>Chargement...</div>;
	if (error) return <div>Erreur : {error.message}</div>;
	if (!data) return <button onClick={send}>Charger l'utilisateur</button>;

	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<button onClick={reset}>Réinitialiser</button>
		</div>
	);
}
```

2. Requête avec paramètres

```tsx
import { useEffect } from 'react'
import { useParametredRequest } from '@fzed51/react-hooks';

function getUserById(id: string) {
	return fetch(`/api/user/${id}`).then((res) => res.json());
}

function useGetUserById() {
    return useRequest(getUserById)
}

interface UserByIdComponentProps {
    id: string
}

function UserByIdComponent({ id }: UserByIdComponentProps) {
	const { data, loading, error, send, reset } = useGetUserById();

	return (
		<div>
			<button onClick={() => send(id)}>Charger l'utilisateur {id}</button>
			{loading && <div>Chargement...</div>}
			{error && <div>Erreur : {error.message}</div>}
			{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
			<button onClick={reset}>Réinitialiser</button>
		</div>
	);
}
```

Les deux hooks exposent :

- `data` : la donnée retournée
- `loading` : l'état de chargement
- `firstLoading` : l'état de chargement du la première requête
- `error` : l'erreur éventuelle
- `send` : fonction pour déclencher la requête
- `reset` : fonction pour réinitialiser l'état

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
