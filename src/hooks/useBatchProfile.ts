import { QueryEndpoint } from "../utils/constants";
import {
  IdentityString,
  ProfileBatchResult,
  ProfileResponse,
  QueryOptions,
} from "../utils/types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio profile data using batch identity lookup
 *
 * @param identity - array of Identity string
 * @param options - Optional configuration options
 * @returns Object containing profile data, loading state, and any errors
 *
 * @example
 * // Query by any identity type with batch lookup
 * const { data } = useBatchProfile(["dwr.farcaster","ens,vitalik.eth","sujiyan.eth","stani.lens"]);
 */
export function useBatchProfile(
  identity: IdentityString[],
  options: QueryOptions = {},
): ProfileBatchResult {
  return useBaseQuery<ProfileResponse[]>(
    identity,
    QueryEndpoint.PROFILE,
    false,
    options,
  );
}
