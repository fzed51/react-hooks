import { useState, useCallback } from "react";

export interface UseRequestState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  firstLoading: boolean;
}

export interface UseRequestReturn<T> extends UseRequestState<T> {
  send: () => Promise<void>;
  reset: () => void;
}

/**
 * Hook simple pour les requêtes sans paramètres
 */
export function useRequest<T>(
  requestFn: () => Promise<T>,
): UseRequestReturn<T> {
  const [state, setState] = useState<UseRequestState<T>>({
    data: null,
    loading: false,
    error: null,
    firstLoading: false,
  });

  const send = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      firstLoading: prev.data === null && !prev.loading,
    }));

    try {
      const result = await requestFn();
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
  }, [requestFn]);

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
