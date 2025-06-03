"use client";
import {
  type NSResponse,
  type QueryOptions,
  type IdentityString,
  type NSResult,
  QueryEndpoint,
} from "../types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio name service (NS) data by identity
 *
 * @param identity - Identity string
 * @param options - Optional configuration options
 * @returns Object containing NS data, loading state, and any errors
 *
 * @example
 * // Query by ENS name
 * const { data, isLoading, error } = useNS("vitalik.eth");
 *
 * // Query by Ethereum address
 * const { data } = useNS("0x123...");
 */
export function useNS(
  identity: IdentityString,
  options: QueryOptions = {},
): NSResult {
  return useBaseQuery<NSResponse>(identity, QueryEndpoint.NS, false, options);
}
