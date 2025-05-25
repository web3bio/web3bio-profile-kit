import { QueryEndpoint } from "../utils/constants";
import { Identity, ProfileQueryResult, ProfileResponse, QueryOptions } from "../utils/types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio profile data using universal identity lookup
 * 
 * @param identity - Identity string or array of identities to query
 * @param options - Optional configuration options
 * @returns Object containing profile data, loading state, and any errors
 * 
 * @example
 * // Query by ENS name with universal lookup
 * const { data, isLoading, error } = useUniversalProfile("vitalik.eth");
 * 
 * // Query by any identity type with universal lookup
 * const { data } = useUniversalProfile("dwr.farcaster");
 */
export function useUniversalProfile(
  identity: Identity,
  options: QueryOptions = {}
): ProfileQueryResult {
  return useBaseQuery<ProfileResponse>(identity, QueryEndpoint.PROFILE, true, options);
}