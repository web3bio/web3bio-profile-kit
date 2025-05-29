import {
  type DomainResponse,
  type DomainResult,
  type IdentityString,
  type QueryOptions,
  QueryEndpoint,
} from "../types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio domain data by identity
 *
 * @param identity - Identity string
 * @param options - Optional configuration options
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
  identity: IdentityString,
  options: QueryOptions = {},
): DomainResult {
  return useBaseQuery<DomainResponse>(
    identity,
    QueryEndpoint.DOMAIN,
    false,
    options,
  );
}
