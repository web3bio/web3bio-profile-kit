import { getApiKey } from "../utils/base";
import { QueryOptions, QueryResult } from "../utils/types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio NS by identity
 * @param {string|string[]} identity - Identity or identities to query (id format: platform,identity)
 * @param {ProfileOptions} options - Query options
 * @returns {ProfileResult} Query result and control methods
 */
export const useQueryNS = (
  identity: string | string[] | null | undefined,
  universal: boolean,
  options: QueryOptions,
): QueryResult => {
  const apiKey = getApiKey(options?.apiKey);
  return useBaseQuery(identity, universal || false, "ns", {
    ...options,
    apiKey,
  });
};
