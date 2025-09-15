/**
 * Supported data source types for profile information
 * Includes blockchain networks, name services, social platforms, and aggregators
 * @public
 */
export enum Source {
  basenames = "basenames",
  camp_network = "camp_network",
  clusters = "clusters",
  crowdsourcing = "crowdsourcing",
  dentity = "dentity",
  dotbit = "dotbit",
  ens = "ens",
  ethereum = "ethereum",
  exchange_art = "exchange_art",
  farcaster = "farcaster",
  firefly = "firefly",
  foundation = "foundation",
  gallery = "gallery",
  gmgn = "gmgn",
  icebreaker = "icebreaker",
  justaname = "justaname",
  keybase = "keybase",
  lens = "lens",
  linea = "linea",
  metopia = "metopia",
  mirror = "mirror",
  nextid = "nextid",
  nftd = "nftd",
  nostr = "nostr",
  opensea = "opensea",
  paragraph = "paragraph",
  particle = "particle",
  rarible = "rarible",
  rey = "rey",
  rss3 = "rss3",
  seekerid = "seekerid",
  sns = "sns",
  solana = "solana",
  soundxyz = "soundxyz",
  space_id = "space_id",
  tally = "tally",
  talentprotocol = "talentprotocol",
  twitter = "twitter",
  unstoppabledomains = "unstoppabledomains",
  zora = "zora",
}

/**
 * Metadata about a data source
 * @public
 */
export interface SourceType {
  name: string;
  description: string;
}
