/**
 * Supported platform types for identity and social profiles
 * Includes blockchain networks, name services, and social platforms
 * @public
 */
export enum Platform {
  aptos = "aptos",
  arbitrum = "arbitrum",
  basenames = "basenames",
  bilibili = "bilibili",
  binance = "binance",
  bitcoin = "bitcoin",
  bluesky = "bluesky",
  box = "box",
  bsc = "bsc",
  calendly = "calendly",
  ckb = "ckb",
  clusters = "clusters",
  coinbase = "coinbase",
  coingecko = "coingecko",
  deepdao = "deepdao",
  degenscore = "degenscore",
  dentity = "dentity",
  discord = "discord",
  doge = "doge",
  dotbit = "dotbit",
  dns = "dns",
  ecp = "ecp",
  efp = "efp",
  ens = "ens",
  ethereum = "ethereum",
  ethos = "ethos",
  facebook = "facebook",
  farcaster = "farcaster",
  firefly = "firefly",
  galxe = "galxe",
  genome = "genome",
  github = "github",
  gitcoin = "gitcoin",
  gnosis = "gnosis",
  gravity = "gravity",
  guild = "guild",
  hackernews = "hackernews",
  humanode = "humanode",
  humanpassport = "humanpassport",
  instagram = "instagram",
  interface = "interface",
  keybase = "keybase",
  lens = "lens",
  linkedin = "linkedin",
  linea = "linea",
  lobsters = "lobsters",
  matters = "matters",
  medium = "medium",
  minds = "minds",
  mirror = "mirror",
  mstdnjp = "mstdnjp",
  near = "near",
  nextid = "nextid",
  nostr = "nostr",
  opensea = "opensea",
  opinion = "opinion",
  paragraph = "paragraph",
  philand = "philand",
  poap = "poap",
  polymarket = "polymarket",
  pumpfun = "pumpfun",
  reddit = "reddit",
  scroll = "scroll",
  seekerid = "seekerid",
  self_xyz = "self_xyz",
  sns = "sns",
  snapshot = "snapshot",
  solana = "solana",
  space_id = "space_id",
  stacks = "stacks",
  substack = "substack",
  talent = "talentprotocol",
  tally = "tally",
  telegram = "telegram",
  threads = "threads",
  tiktok = "tiktok",
  ton = "ton",
  tron = "tron",
  twitter = "twitter",
  uniswap = "uniswap",
  unstoppableDomains = "unstoppabledomains",
  url = "url",
  v2ex = "v2ex",
  webacy = "webacy",
  website = "website",
  weibo = "weibo",
  whatsapp = "whatsapp",
  world_id = "world_id",
  xmtp = "xmtp",
  youtube = "youtube",
  zkme = "zkme",
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
}
