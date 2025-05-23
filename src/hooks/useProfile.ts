import { QueryEndpoint } from "../utils/constants";
import { Identity, ProfileQueryResult, ProfileResponse, QueryOptions } from "../utils/types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio profile data by identity
 * 
 * @param identity - Identity string or array of identities to query
 * @param options - Optional configuration options
 * @param universal - Whether to use universal identity lookup (default: false)
 * @returns Object containing profile data, loading state, and any errors
 * 
 * @example
 * // Query by ENS name
 * const { data, isLoading, error } = useProfile("vitalik.eth");
 * 
 * // Query with platform specification
 * const { data } = useProfile("farcaster,dwr");
 */
export function useProfile(
  identity: Identity,
  options: QueryOptions = {},
  universal: boolean = false
): ProfileQueryResult {
  return useBaseQuery<ProfileResponse>(identity, QueryEndpoint.PROFILE, options, universal);
}