# useRequest & useParametredRequest

Ces hooks facilitent la gestion des requêtes asynchrones dans vos composants React.

## Gestion du cache

Les hooks intègrent un système de cache pour éviter de refaire inutilement les mêmes requêtes :

- Le cache est activé par défaut : chaque requête (fonction + paramètres) est mémorisée pendant une durée configurable (TTL, par défaut 5 minutes).
- Si une requête identique est déjà en cours ou a déjà été effectuée, le hook retourne la donnée en cache ou la promesse en attente.
- Le cache est réinitialisé par l'appel à `reset()` ou via les méthodes d'invalidation du cache (voir API avancée).

### Utilisation basique

Par défaut, le cache est utilisé automatiquement :

```tsx
const { data, send } = useRequest(getUser);
send(); // la donnée sera mise en cache
```

Pour les requêtes avec paramètres, la clé de cache inclut les paramètres :

```tsx
const { data, send } = useParametredRequest(getUserById);
send("42"); // la donnée pour l'id '42' sera mise en cache
```

### Désactiver le cache

Vous pouvez désactiver le cache pour une requête :

```tsx
const { data, send } = useRequest(getUser, { cache: undefined });
```

### Personnaliser la clé et la durée du cache

```tsx
const { data, send } = useRequest(getUser, {
  cache: { key: "getUser", ttl: 10 * 60 * 1000 },
});
```

### API avancée (invalidation du cache)

L'instance globale `apiCache` expose des méthodes pour invalider ou nettoyer le cache :

- `apiCache.invalidate(functionName, params?)` : invalide une entrée précise
- `apiCache.invalidateByFunction(functionName)` : invalide toutes les entrées pour une fonction
- `apiCache.clear()` : vide tout le cache

Voir le fichier `src/useRequest/cache.ts` pour plus de détails.

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
import { useEffect } from "react";
import { useRequest } from "@fzed51/react-hooks";

function getUser() {
  return fetch("/api/user").then((res) => res.json());
}

function useGetUser() {
  return useRequest(getUser);
}

function UserComponent() {
  const { data, loading, error, send, reset } = useGetUser();

  useEffect(() => {
    send();
  }, []);

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
import { useParametredRequest } from "@fzed51/react-hooks";

function getUserById(id: string) {
  return fetch(`/api/user/${id}`).then((res) => res.json());
}

function useGetUserById() {
  return useParametredRequest(getUserById);
}

interface UserByIdComponentProps {
  id: string;
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
