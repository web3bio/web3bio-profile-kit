import { QueryEndpoint } from "../utils/constants";
import { Identity, NSResponse, NSQueryResult, QueryOptions } from "../utils/types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio name service (NS) data by identity
 * 
 * @param identity - Identity string or array of identities to query
 * @param options - Optional configuration options
 * @param universal - Whether to use universal identity lookup (default: false)
 * @returns Object containing NS data, loading state, and any errors
 * 
 * @example
 * // Query by ENS name
 * const { data, isLoading, error } = useNameService("vitalik.eth");
 * 
 * // Query by Ethereum address
 * const { data } = useNameService("0x123...");
 */
export function useNameService(
  identity: Identity,
  options: QueryOptions = {},
  universal: boolean = false
): NSQueryResult {
  return useBaseQuery<NSResponse>(identity, QueryEndpoint.NS, options, universal);
}