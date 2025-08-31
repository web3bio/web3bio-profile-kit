/**
 * Supported platform types for identity and social profiles
 * Includes blockchain networks, name services, and social platforms
 * @public
 */
export enum Platform {
  ailayer = "ailayer",
  alienx = "alienx",
  aptos = "aptos",
  arbitrum = "arbitrum",
  basenames = "basenames",
  bilibili = "bilibili",
  bitcoin = "bitcoin",
  bluesky = "bluesky",
  box = "box",
  bsc = "bsc",
  calendly = "calendly",
  ckb = "ckb",
  clusters = "clusters",
  coingecko = "coingecko",
  cosmos = "cosmos",
  crossbell = "crossbell",
  cyberconnect = "cyberconnect",
  degenscore = "degenscore",
  discord = "discord",
  doge = "doge",
  dotbit = "dotbit",
  dns = "dns",
  ecp = "ecp",
  edgeless = "edgeless",
  efp = "efp",
  ens = "ens",
  ethos = "ethos",
  ethereum = "ethereum",
  facebook = "facebook",
  farcaster = "farcaster",
  firefly = "firefly",
  genome = "genome",
  github = "github",
  gitcoin = "gitcoin",
  gnosis = "gnosis",
  gravity = "gravity",
  guild = "guild",
  hackernews = "hackernews",
  hey = "hey",
  humanpassport = "humanpassport",
  instagram = "instagram",
  keybase = "keybase",
  lens = "lens",
  lightlink = "lightlink",
  linkedin = "linkedin",
  linea = "linea",
  lobsters = "lobsters",
  manta = "manta",
  medium = "medium",
  merlin = "merlin",
  minds = "minds",
  mint = "mint",
  mirror = "mirror",
  mode = "mode",
  mstdnjp = "mstdnjp",
  near = "near",
  nextid = "nextid",
  nostr = "nostr",
  opensea = "opensea",
  paragraph = "paragraph",
  philand = "philand",
  poap = "poap",
  polymarket = "polymarket",
  pumpfun = "pumpfun",
  reddit = "reddit",
  scroll = "scroll",
  seekerid = "seekerid",
  sns = "sns",
  snapshot = "snapshot",
  solana = "solana",
  space_id = "space_id",
  stacks = "stacks",
  talent = "talentprotocol",
  taiko = "taiko",
  telegram = "telegram",
  threads = "threads",
  tiktok = "tiktok",
  tomo = "tomo",
  ton = "ton",
  tron = "tron",
  twitter = "twitter",
  unstoppableDomains = "unstoppabledomains",
  url = "url",
  v2ex = "v2ex",
  webacy = "webacy",
  website = "website",
  weibo = "weibo",
  whatsapp = "whatsapp",
  youtube = "youtube",
  zeta = "zeta",
  zkfair = "zkfair",
  zora = "zora",
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
