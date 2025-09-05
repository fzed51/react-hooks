export interface UseRequestState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  firstLoading: boolean;
}

export interface UseRequestOptions {
  cache?: {
    key: string;
    ttl?: number;
  };
}
