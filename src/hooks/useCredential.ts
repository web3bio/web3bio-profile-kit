import {
  type CredentialResponse,
  type QueryOptions,
  type IdentityString,
  QueryEndpoint,
  CredentialResult,
} from "../types";
import { useBaseQuery } from "./useBaseQuery";

/**
 * Hook to query Web3.bio credential service data by identity
 *
 * @param identity - Identity string
 * @param options - Optional configuration options
 * @returns Object containing credential data, loading state, and any errors
 *
 * @example
 * // Query by ENS name with universal lookup
 * const { data, isLoading, error } = useCredential("ens,vitalik.eth");
 *
 * // Query by any identity type with universal lookup
 * const { data } = useCredential("ggmonster.farcaster");
 */
export function useCredential(
  identity: IdentityString,
  options: QueryOptions = {},
): CredentialResult {
  return useBaseQuery<CredentialResponse>(
    identity,
    QueryEndpoint.CREDENTIAL,
    false,
    options,
  );
}
