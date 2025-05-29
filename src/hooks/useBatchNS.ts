import {
  type IdentityString,
  type NSBatchResult,
  type NSResponse,
  type QueryOptions,
  QueryEndpoint,
} from "../types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio profile data using batch(NS) identity lookup
 *
 * @param identity - array of Identity string
 * @param options - Optional configuration options
 * @returns Object containing profile data, loading state, and any errors
 *
 * @example
 * // Query by any identity type with batch lookup
 * const { data } = useBatchNS(["dwr.farcaster","ens,vitalik.eth","sujiyan.eth","stani.lens"]);
 */
export function useBatchNS(
  identity: IdentityString[],
  options: QueryOptions = {},
): NSBatchResult {
  return useBaseQuery<NSResponse[]>(identity, QueryEndpoint.NS, false, options);
}
