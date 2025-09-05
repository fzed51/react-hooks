# useRequest & useParametredRequest

Ces hooks facilitent la gestion des requêtes asynchrones dans vos composants React.

## API commune

Les deux hooks exposent :

- `data` : la donnée retournée
- `loading` : l'état de chargement
- `firstLoading` : l'état de chargement de la première requête
- `error` : l'erreur éventuelle
- `send` : fonction pour déclencher la requête
- `reset` : fonction pour réinitialiser l'état

---

## useRequest

Pour les requêtes sans paramètres.

### Exemple

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

    useEffect(() => { send() }, [])

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

---

## useParametredRequest

Pour les requêtes avec paramètres.

### Exemple

```tsx
import { useParametredRequest } from '@fzed51/react-hooks';

function getUserById(id: string) {
	return fetch(`/api/user/${id}`).then((res) => res.json());
}

function useGetUserById() {
    return useParametredRequest(getUserById)
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
