import { getApiKey } from "../utils/base";
import {
  Identity,
  QueryEndpoint,
  QueryOptions,
  QueryResult,
} from "../utils/types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio NS by identity
 * @param {Identity} identity - Identity or identities to query (id format: platform,identity)
 * @param {QueryOptions} options - Query options
 * @returns {QueryResult} Query result and control methods
 */
export const useQueryProfile = (
  identity: Identity,
  universal: boolean,
  options: QueryOptions,
): QueryResult => {
  const apiKey = getApiKey(options?.apiKey);
  return useBaseQuery(identity, universal || false, QueryEndpoint.profile, {
    ...options,
    apiKey,
  });
};
