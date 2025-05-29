/**
 * Supported data source types for profile information
 * Includes blockchain networks, name services, social platforms, and aggregators
 * @public
 */
export enum SourceType {
  ethereum = "ethereum",
  ens = "ens",
  twitter = "twitter",
  keybase = "keybase",
  nextid = "nextid",
  rss3 = "rss3",
  dotbit = "dotbit",
  unstoppabledomains = "unstoppabledomains",
  lens = "lens",
  farcaster = "farcaster",
  space_id = "space_id",
  crossbell = "crossbell",
  clusters = "clusters",
  solana = "solana",
  sns = "sns",
  opensea = "opensea",
  firefly = "firefly",
  basenames = "basenames",
  dentity = "dentity",
  nftd = "nftd",
  mirror = "mirror",
  paragraph = "paragraph",
  foundation = "foundation",
  rarible = "rarible",
  soundxyz = "soundxyz",
  gravity = "gravity",
  linea = "linea",
  gmgn = "gmgn",
  nostr = "nostr",
  talentprotocol = "talentprotocol",
  crowdsourcing = "crowdsourcing",
  particle = "particle",
  tally = "tally",
  icebreaker = "icebreaker",
}

/**
 * Metadata about a data source
 * @public
 */
export interface SourceInfo {
  name: string;
  description: string;
}
