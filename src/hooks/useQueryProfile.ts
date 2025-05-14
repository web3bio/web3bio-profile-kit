import { PlatformType } from "../utils/types";
import { QueryResult, useBaseQuery } from "./useBaseQuery";

export interface ProfileOptions {
  platform?: PlatformType;
  /** API Key for authentication */
  apiKey?: string;
  /** Whether the query should execute */
  enabled?: boolean;
}

/**
 * Hook to query Web3.bio profiles by identity
 * @param {string|string[]} identity - Identity or identities to query (id format: platform,identity)
 * @param {ProfileOptions} options - Query options
 * @returns {ProfileResult} Query result and control methods
 */
export const useQueryProfile = (
  identity: string | string[] | null | undefined,
  options: ProfileOptions,
): QueryResult => {
  return useBaseQuery(identity, "profile", options);
};
