import { useState, useCallback } from 'react';

interface GraphQLResponse<T> {
  data?: T;
  errors?: any;
}

const useGraphQL = <T>(endpoint: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const query = useCallback(async (query: string, variables?: any) => {
    setLoading(true);
    setError(null);
    setData(null);

    if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result: GraphQLResponse<T> = await response.json();

      if (result.errors) {
        setError(result.errors[0].message);
      } else {
        setData(result.data || null);
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }
  }, [endpoint]);

  return { loading, error, data, query };
};

export default useGraphQL;
