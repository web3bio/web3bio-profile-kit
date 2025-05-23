import { QueryEndpoint } from "../utils/constants";
import { DomainQueryResult, DomainResponse, Identity, QueryOptions } from "../utils/types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio domain data by identity
 * 
 * @param identity - Identity string or array of identities to query
 * @param options - Optional configuration options
 * @param universal - Whether to use universal identity lookup (default: false)
 * @returns Object containing domain data, loading state, and any errors
 * 
 * @example
 * // Query by ENS name
 * const { data, isLoading, error } = useDomain("vitalik.eth");
 * 
 * // Query by domain name with platform
 * const { data } = useDomain("ens,vitalik.eth");
 */
export function useDomain(
  identity: Identity,
  options: QueryOptions = {},
  universal: boolean = false
): DomainQueryResult {
  return useBaseQuery<DomainResponse>(identity, QueryEndpoint.DOMAIN, options, universal);
}