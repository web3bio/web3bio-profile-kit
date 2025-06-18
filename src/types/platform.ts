/**
 * Supported platform types for identity and social profiles
 * Includes blockchain networks, name services, and social platforms
 * @public
 */
export enum Platform {
  ens = "ens",
  dotbit = "dotbit",
  lens = "lens",
  box = "box",
  ethereum = "ethereum",
  twitter = "twitter",
  nextid = "nextid",
  bitcoin = "bitcoin",
  keybase = "keybase",
  reddit = "reddit",
  github = "github",
  unstoppableDomains = "unstoppabledomains",
  basenames = "basenames",
  linea = "linea",
  ckb = "ckb",
  farcaster = "farcaster",
  space_id = "space_id",
  telegram = "telegram",
  instagram = "instagram",
  cyberconnect = "cyberconnect",
  opensea = "opensea",
  discord = "discord",
  calendly = "calendly",
  url = "url",
  website = "website",
  linkedin = "linkedin",
  dns = "dns",
  tron = "tron",
  hey = "hey",
  facebook = "facebook",
  threads = "threads",
  whatsapp = "whatsapp",
  weibo = "weibo",
  youtube = "youtube",
  tiktok = "tiktok",
  bilibili = "bilibili",
  medium = "medium",
  mirror = "mirror",
  bluesky = "bluesky",
  nostr = "nostr",
  poap = "poap",
  degenscore = "degenscore",
  firefly = "firefly",
  solana = "solana",
  sns = "sns",
  mstdnjp = "mstdnjp",
  lobsters = "lobsters",
  hackernews = "hackernews",
  crossbell = "crossbell",
  minds = "minds",
  paragraph = "paragraph",
  genome = "genome",
  gnosis = "gnosis",
  webacy = "webacy",
  clusters = "clusters",
  guild = "guild",
  ton = "ton",
  snapshot = "snapshot",
  coingecko = "coingecko",
  gitcoin = "gitcoin",
  humanpassport = "humanpassport",
  talent = "talentprotocol",
  doge = "doge",
  bsc = "bsc",
  aptos = "aptos",
  near = "near",
  stacks = "stacks",
  cosmos = "cosmos",
  zeta = "zeta",
  mode = "mode",
  arbitrum = "arbitrum",
  scroll = "scroll",
  taiko = "taiko",
  mint = "mint",
  zkfair = "zkfair",
  manta = "manta",
  lightlink = "lightlink",
  merlin = "merlin",
  alienx = "alienx",
  edgeless = "edgeless",
  tomo = "tomo",
  ailayer = "ailayer",
  philand = "philand",
  efp = "efp",
  gravity = "gravity",
}

/**
 * Platform metadata structure
 * Contains display and functional information about a platform
 * @public
 */
export interface PlatformType {
  color?: string;
  icon?: string;
  label: string;
  description?: string;
  urlPrefix?: string;
  ensText?: string[];
  registerlink?: string;
  editUrlPrefix?: string;
  system: PlatformSystem;
}

/**
 * Platform system classification
 * @public
 */
export enum PlatformSystem {
  /** Traditional web platforms */
  web2 = 0,
  /** Blockchain/decentralized platforms */
  web3 = 1,
}
