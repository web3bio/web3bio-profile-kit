import type { Network } from "./network";
import type { Platform } from "./platform";
import type { Source } from "./source";

/**
 * Standard error messages used across the library
 * @public
 */
export enum ErrorMessages {
  /** Resource not found */
  NOT_FOUND = "Not Found",
  /** Resolver address is invalid */
  INVALID_RESOLVER = "Invalid Resolver Address",
  /** Resolved address is invalid */
  INVALID_RESOLVED = "Invalid Resolved Address",
  /** Resource does not exist */
  NOT_EXIST = "Does Not Exist",
  /** Provided identity or domain is invalid */
  INVALID_IDENTITY = "Invalid Identity or Domain",
  /** Provided address is invalid */
  INVALID_ADDRESS = "Invalid Address",
  /** An unknown error occurred */
  UNKNOWN_ERROR = "Unknown Error Occurred",
  /** Network-related error */
  NETWORK_ERROR = "Network Error",
}

/**
 * API endpoints for different query types
 * @public
 */
export enum QueryEndpoint {
  /** Name service endpoint */
  NS = "ns",
  /** Profile data endpoint */
  PROFILE = "profile",
  /** Domain information endpoint */
  DOMAIN = "domain",
}

/**
 * Represents a blockchain address record
 * @public
 */
export type AddressRecord = {
  /** The blockchain address */
  address: string;
  /** Network identifier */
  network: string;
  /** Type identifier */
  __typename: "Address";
};

/**
 * Social link information for a profile
 * @public
 */
export type SocialLinksItem = {
  /** URL to the social profile */
  link: string | null;
  /** Username or handle on the platform */
  handle: string | null;
  /** Data sources that provided this information */
  sources: Source[];
};

/**
 * Collection of social links indexed by platform
 * @public
 */
export type SocialLinks = Record<string, SocialLinksItem>;

/**
 * Social account metrics
 * @public
 */
export type SocialRecord = {
  /** Unique identifier */
  uid: number | null;
  /** Number of followers */
  follower: number;
  /** Number of accounts being followed */
  following: number;
};

/**
 * Complete profile response from the API
 * @public
 */
export interface ProfileResponse extends NSResponse {
  /** Email address */
  email: string | null;
  /** Content hash */
  contenthash: string | null;
  /** Profile header image */
  header: string | null;
  /** Geographic location */
  location: string | null;
  /** Creation timestamp */
  createdAt: string | null;
  /** Profile status */
  status: string | null;
  /** Error message if any */
  error?: string;
  /** Social platform links */
  links: SocialLinks;
  /** Social metrics */
  social: SocialRecord | {};
}

/**
 * Name service response from the API
 * @public
 */
export interface NSResponse {
  /** Identifier string */
  identity: string;
  /** Associated blockchain address */
  address: string | null;
  /** Avatar image URL */
  avatar: string | null;
  /** Profile description */
  description: string | null;
  /** Platform identifier */
  platform: string;
  /** Human-readable display name */
  displayName: string | null;
  /** Alternative identities */
  aliases?: string[];
}

/**
 * Domain information response from the API
 * @public
 */
export interface DomainResponse {
  /** Domain identifier */
  identity: string;
  /** Platform type */
  platform: Platform;
  /** Address resolved by this domain */
  resolvedAddress: string | null;
  /** Owner's address */
  ownerAddress: string | null;
  /** Manager's address */
  managerAddress: string | null;
  /** Human-readable display name */
  displayName: string | null;
  /** Whether this is the primary domain */
  isPrimary: boolean;
  /** Domain status */
  status: string;
  /** Creation timestamp */
  createdAt: string | null;
  /** Last update timestamp */
  updatedAt: string | null;
  /** Expiration timestamp */
  expiredAt: string | null;
  /** Content hash */
  contenthash: string | null;
  /** Text records */
  texts: Record<string, string>;
  /** Address records by network */
  addresses: Record<Network, string>;
}

/**
 * Configuration options for queries
 * @public
 */
export type QueryOptions = {
  /** API Key for authentication */
  apiKey?: string;
  /** Whether the query should execute */
  enabled?: boolean;
};

/**
 * Identity string used to query profiles
 * Can be a plain string or a platform-prefixed string
 * @public
 */
export type IdentityString = string | `${Platform},${string}`;

/**
 * Generic query result containing data, loading state, and errors
 * @public
 */
export type QueryResult<T> = {
  /** Response data or null if not loaded/error */
  data: T | null;
  /** Whether the query is in progress */
  isLoading: boolean;
  /** Error object if the query failed */
  error: Error | null;
};

/**
 * Specialized result types for better type safety
 * @public
 */
export type ProfileResult = QueryResult<ProfileResponse>;
export type NSResult = QueryResult<NSResponse>;
export type ProfileBatchResult = QueryResult<ProfileResponse[]>;
export type NSBatchResult = QueryResult<NSResponse[]>;
export type ProfileUniversalResult = QueryResult<ProfileResponse[]>;
export type NSUniversalResult = QueryResult<NSResponse[]>;
export type DomainResult = QueryResult<DomainResponse>;
