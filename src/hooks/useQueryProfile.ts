import { useState, useEffect } from "react";
import { PROFILE_API_ENDPOINT } from "../utils/base";

export interface ProfileOptions {
  /** Path to query */
  path: "profile" | "ns";
  /** API Key for authentication */
  apiKey?: string;
  /** Whether the query should execute */
  enabled?: boolean;
}

export interface ProfileResult<T = any> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to query Web3.bio profiles by identity
 * @param {string|string[]} identity - Identity or identities to query (id format: palatform,identity)
 * @param {ProfileOptions} options - Query options, path is required
 * @returns {ProfileResult} Query result and control methods
 */
export const useQueryProfile = <T = any>(
  identity: string | string[] | null | undefined,
  options: ProfileOptions = {
    path: "ns",
  },
): ProfileResult<T> => {
  const { apiKey, enabled = true, path } = options;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!enabled || !identity) return;

    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        let url = "";
        if (Array.isArray(identity)) {
          url = `${PROFILE_API_ENDPOINT}/${path}/batch/${JSON.stringify(identity)}`;
        } else if (identity.includes(",")) {
          const platform = identity.split(",")[0].toLowerCase();
          const domain = identity.split(",")[1];
          url = `${PROFILE_API_ENDPOINT}/${path}/${platform}/${domain}`;
        } else {
          url = `${PROFILE_API_ENDPOINT}/${path}/${identity}`;
        }

        const requestHeaders: HeadersInit = {
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        };

        const response = await fetch(url, {
          method: "GET",
          headers: requestHeaders,
          signal: abortController.signal,
        });

        const responseData = await response.json();
        if (responseData?.error) {
          setError(responseData.error);
          return;
        }
        setData(responseData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [identity, apiKey, enabled, path]);

  return { data, isLoading, error };
};
