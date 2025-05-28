import { Network } from "./network";
import type { PlatformType } from "./platform";
import type { SourceType } from "./source";

export type AddressRecord = {
  address: string;
  network: string;
  __typename: "Address";
};

export type SocialLinksItem = {
  link: string | null;
  handle: string | null;
  sources: SourceType[];
};

export type SocialLinks = Record<string, SocialLinksItem>;

export type SocialRecord = {
  uid: number | null;
  follower: number;
  following: number;
};

export interface ProfileResponse extends NSResponse {
  email: string | null;
  contenthash: string | null;
  header: string | null;
  location: string | null;
  createdAt: string | null;
  status: string | null;
  error?: string;
  links: SocialLinks;
  social: SocialRecord | {};
}

export interface NSResponse {
  identity: string;
  address: string | null;
  avatar: string | null;
  description: string | null;
  platform: string;
  displayName: string | null;
  aliases?: string[];
}

export interface DomainResponse {
  identity: string;
  platform: PlatformType;
  resolvedAddress: string | null;
  ownerAddress: string | null;
  managerAddress: string | null;
  displayName: string | null;
  isPrimary: boolean;
  status: string;
  createdAt: string | null;
  updatedAt: string | null;
  expiredAt: string | null;
  contenthash: string | null;
  texts: Record<string, string>;
  addresses: Record<Network, string>;
}

export type QueryOptions = {
  /** API Key for authentication */
  apiKey?: string;
  /** Whether the query should execute */
  enabled?: boolean;
};

export type IdentityString = string | `${PlatformType},${string}`;

export type QueryResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

// Query-specific result types for better type safety
export type ProfileResult = QueryResult<ProfileResponse>;
export type NSResult = QueryResult<NSResponse>;
export type ProfileBatchResult = QueryResult<ProfileResponse[]>;
export type NSBatchResult = QueryResult<NSResponse[]>;
export type ProfileUniversalResult = QueryResult<ProfileResponse[]>;
export type NSUniversalResult = QueryResult<NSResponse[]>;
export type DomainResult = QueryResult<DomainResponse>;
