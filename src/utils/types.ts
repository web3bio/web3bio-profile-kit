export enum PlatformType {
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
  zerion = "zerion",
  aave = "aave",
  rainbow = "rainbow",
  bluesky = "bluesky",
  nostr = "nostr",
  poap = "poap",
  uniswap = "uniswap",
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

enum SourceType {
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
  firefly_campaigns = "firefly_campaigns",
  mask_stake = "mask_stake",
  crowdsourcing = "crowdsourcing",
  particle = "particle",
}

export interface ProfileNSResponse {
  identity: string;
  address: string;
  avatar: string | null;
  description: string | null;
  platform: string;
  displayName: string | null;
}
export interface ProfileResponse extends ProfileNSResponse {
  email: string | null;
  contenthash: string | null;
  header: string | null;
  location: string | null;
  createdAt: string | null;
  status: string | null;
  error?: string;
  links: Links | {};
  social:
    | {
        uid: number | null;
        follower: number;
        following: number;
      }
    | {};
}

type Links = Record<PlatformType, LinksItem>;

type LinksItem = {
  link: string | null;
  handle: string | null;
  sources: SourceType[];
};
