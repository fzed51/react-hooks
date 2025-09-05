import { useState, useCallback } from "react";
import { UseRequestState, UseRequestOptions } from "./types";
import { apiCache } from "./cache";

export interface UseParametredRequestReturn<T, P extends unknown[]>
  extends UseRequestState<T> {
  send: (...params: P) => Promise<void>;
  reset: () => void;
}

/**
 * Hook pour les requêtes avec paramètres
 */
export function useParametredRequest<T, P extends unknown[]>(
  requestFn: (...params: P) => Promise<T>,
  options: UseRequestOptions = {},
): UseParametredRequestReturn<T, P> {
  const [state, setState] = useState<UseRequestState<T>>({
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
        let result: T;
        if (options?.cache) {
          // Utilisation du cache
          result = await apiCache.request(
            options.cache.key,
            requestFn,
            params,
            options.cache.ttl,
          );
        } else {
          result = await requestFn(...params);
        }
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
