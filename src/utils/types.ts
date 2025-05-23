export enum PlatformType {
  ens = "ens",
  dotbit = "dotbit",
  lens = "lens",
  ethereum = "ethereum",
  twitter = "twitter",
  farcaster = "farcaster",
  bitcoin = "bitcoin",
  unstoppableDomains = "unstoppabledomains",
  basenames = "basenames",
  linea = "linea",
  space_id = "space_id",
  solana = "solana",
  sns = "sns",
  nextid = "nextid",
  // Additional platforms can be added as needed
}

export enum SourceType {
  ethereum = "ethereum",
  ens = "ens",
  twitter = "twitter",
  nextid = "nextid",
  dotbit = "dotbit",
  unstoppabledomains = "unstoppabledomains",
  lens = "lens",
  farcaster = "farcaster",
  space_id = "space_id",
  solana = "solana",
  sns = "sns",
  // Additional sources can be added as needed
}

export type SocialLinksItem = {
  link: string | null;
  handle: string | null;
  sources: SourceType[];
};

export type SocialLinks = Record<string, SocialLinksItem>;

export interface ProfileResponse {
  identity: string;
  address: string | null;
  avatar: string | null;
  description: string | null;
  platform: string;
  displayName: string | null;
  email: string | null;
  contenthash: string | null;
  header: string | null;
  location: string | null;
  createdAt: string | null;
  status: string | null;
  error?: string;
  links: SocialLinks;
  social:
    | {
        uid: number | null;
        follower: number;
        following: number;
      }
    | {};
}

export interface NSResponse {
  identity: string;
  address: string | null;
  avatar: string | null;
  description: string | null;
  platform: string;
  displayName: string | null;
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
  addresses: Record<string, string>;
}

export type QueryOptions = {
  /** API Key for authentication */
  apiKey?: string;
  /** Whether the query should execute */
  enabled?: boolean;
};

export type IdentityString = string | `${PlatformType},${string}`;
export type Identity = IdentityString | IdentityString[];

export type QueryResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

// Query-specific result types for better type safety
export type ProfileQueryResult = QueryResult<ProfileResponse>;
export type NSQueryResult = QueryResult<NSResponse>;
export type DomainQueryResult = QueryResult<DomainResponse>;
