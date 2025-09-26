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
  erc1577 = "erc1577",
  ethereum = "ethereum",
  fantom = "fantom",
  farcaster = "farcaster",
  flow = "flow",
  gnosis = "gnosis",
  lens = "lens",
  linea = "linea",
  mantle = "mantle",
  mastodon = "mastodon",
  optimism = "optimism",
  plasma = "plasma",
  polygon = "polygon",
  scroll = "scroll",
  solana = "solana",
  starknet = "starknet",
  unichain = "unichain",
  world = "world",
  xLayer = "x-layer",
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
  primaryColor: string;
  scanLabel?: string;
  scanPrefix: string;
  scanPrefixTx?: string;
  short?: string;
}
