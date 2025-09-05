# useRenderCount

Ce hook permet de compter et d'afficher dans la console le nombre de rendus d'un composant React. Il détecte également si le composant est monté en mode StrictMode (utile en développement).

## Exemple d'utilisation

```tsx
import { useRenderCount } from '@fzed51/react-hooks';

function MyComponent() {
	useRenderCount('MyComponent');
	return <div>Mon composant</div>;
}
```

À chaque rendu, le hook affiche dans la console :

```
MyComponent render #1
MyComponent render #2
...
```

En mode StrictMode, le message inclut le flag `[StrictMode]` lors du premier rendu :

```
MyComponent render #1 [StrictMode]
```
