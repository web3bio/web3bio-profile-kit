"use client";
import {
  type IdentityString,
  type ProfileResponse,
  type ProfileResult,
  type QueryOptions,
  QueryEndpoint,
} from "../types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio profile data by identity
 *
 * @param identity - Identity string
 * @param options - Optional configuration options
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
  identity: IdentityString,
  options: QueryOptions = {},
): ProfileResult {
  return useBaseQuery<ProfileResponse>(
    identity,
    QueryEndpoint.PROFILE,
    false,
    options,
  );
}
