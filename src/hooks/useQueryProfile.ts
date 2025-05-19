import { QueryOptions, QueryResult } from "../utils/types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio NS by identity
 * @param {string|string[]} identity - Identity or identities to query (id format: platform,identity)
 * @param {ProfileOptions} options - Query options
 * @returns {ProfileResult} Query result and control methods
 */
export const useQueryProfile = (
  identity: string | string[] | null | undefined,
  universal: boolean,
  options: QueryOptions,
): QueryResult => {
  const apiKey =
    options?.apiKey ||
    process.env.WEB3BIO_API_KEY ||
    process.env.REACT_APP_WEB3BIO_API_KEY ||
    process.env.VITE_WEB3BIO_API_KEY ||
    process.env.NEXT_PUBLIC_WEB3BIO_API_KEY;

  return useBaseQuery(identity, universal, "ns", {
    ...options,
    apiKey,
  });
};
