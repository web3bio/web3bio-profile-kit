import {
  type NSResponse,
  type QueryOptions,
  type IdentityString,
  type NSUniversalResult,
  QueryEndpoint,
} from "../types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio name service (NS) data using universal identity lookup
 *
 * @param identity - Identity string
 * @param options - Optional configuration options
 * @returns Object containing NS data, loading state, and any errors
 *
 * @example
 * // Query by ENS name with universal lookup
 * const { data, isLoading, error } = useUniversalNS("vitalik.eth");
 *
 * // Query by any identity type with universal lookup
 * const { data } = useUniversalNS("dwr.farcaster");
 */
export function useUniversalNS(
  identity: IdentityString,
  options: QueryOptions = {},
): NSUniversalResult {
  return useBaseQuery<NSResponse[]>(identity, QueryEndpoint.NS, true, options);
}
