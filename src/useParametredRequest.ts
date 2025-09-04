import { useState, useCallback } from "react";

export interface UseParametredRequestState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  firstLoading: boolean;
}

export interface UseParametredRequestReturn<T, P extends unknown[]>
  extends UseParametredRequestState<T> {
  send: (...params: P) => Promise<void>;
  reset: () => void;
}

/**
 * Hook pour les requêtes avec paramètres
 */
export function useParametredRequest<T, P extends unknown[]>(
  requestFn: (...params: P) => Promise<T>,
): UseParametredRequestReturn<T, P> {
  const [state, setState] = useState<UseParametredRequestState<T>>({
    data: null,
    loading: false,
    error: null,
    firstLoading: false,
  });

  const send = useCallback(
    async (...params: P) => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        firstLoading: prev.data === null && !prev.loading,
      }));

      try {
        const result = await requestFn(...params);
        setState({
          data: result,
          loading: false,
          error: null,
          firstLoading: false,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
          firstLoading: false,
        });
      }
    },
    [requestFn],
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      firstLoading: false,
    });
  }, []);

  return {
    ...state,
    send,
    reset,
  };
}
