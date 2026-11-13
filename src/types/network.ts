/**
 * Supported blockchain networks and protocols
 * @public
 */
export enum Network {
  abstract = "abstract",
  aptos = "aptos",
  arbitrum = "arbitrum",
  arbitrum_nova = "arbitrum_nova",
  apechain = "apechain",
  arweave = "arweave",
  avalanche = "avalanche",
  base = "base",
  bitcoin = "bitcoin",
  bsc = "bsc",
  conflux = "conflux",
  dogecoin = "dogecoin",
  erc1577 = "erc1577",
  ethereum = "ethereum",
  fantom = "fantom",
  farcaster = "farcaster",
  flow = "flow",
  gnosis = "gnosis",
  kusama = "kusama",
  lens = "lens",
  linea = "linea",
  litecoin = "litecoin",
  mantle = "mantle",
  mastodon = "mastodon",
  near = "near",
  optimism = "optimism",
  plasma = "plasma",
  polkadot = "polkadot",
  polygon = "polygon",
  scroll = "scroll",
  solana = "solana",
  starknet = "starknet",
  sui = "sui",
  ton = "ton",
  tron = "tron",
  unichain = "unichain",
  world = "world",
  xLayer = "x-layer",
  xrpl = "xrpl",
  zero = "zero",
  zksync_era = "zksync_era",
  zora = "zora",
}

/**
 * Network metadata interface containing display and functional information
 * @public
 */
export interface NetworkType {
  assetPrefix?: string;
  bgColor: string;
  chainId?: number;
  icon: string;
  key: string;
  label: string;
  nativeSymbol?: string;
  primaryColor: string;
  rpcUrl?: string;
  scanLabel?: string;
  scanPrefix: string;
  scanPrefixTx?: string;
  short?: string;
}
