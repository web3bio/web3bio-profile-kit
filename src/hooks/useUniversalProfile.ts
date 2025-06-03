"use client";
import {
  type IdentityString,
  type ProfileResponse,
  type ProfileUniversalResult,
  type QueryOptions,
  QueryEndpoint,
} from "../types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio profile data using universal identity lookup
 *
 * @param identity - Identity string
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
  identity: IdentityString,
  options: QueryOptions = {},
): ProfileUniversalResult {
  return useBaseQuery<ProfileResponse[]>(
    identity,
    QueryEndpoint.PROFILE,
    true,
    options,
  );
}
