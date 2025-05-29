/**
 * Supported blockchain networks and protocols
 * @public
 */
export enum Network {
  aptos = "aptos",
  arbitrum = "arbitrum",
  arbitrum_nova = "arbitrum_nova",
  arbitrum_one = "arbitrum_one",
  apechain = "apechain",
  arweave = "arweave",
  avalanche = "avalanche",
  base = "base",
  bitcoin = "bitcoin",
  binanceSmartChain = "binance-smart-chain",
  bsc = "bsc",
  conflux = "conflux",
  crossbell = "crossbell",
  erc1577 = "erc1577",
  ethereum = "ethereum",
  fantom = "fantom",
  farcaster = "farcaster",
  flow = "flow",
  gnosis = "gnosis",
  lens = "lens",
  linea = "linea",
  mastodon = "mastodon",
  optimism = "optimism",
  polygon = "polygon",
  scroll = "scroll",
  snapshot = "snapshot",
  solana = "solana",
  vsl = "vsl",
  xLayer = "x-layer",
  zksync_era = "zksync_era",
  zora = "zora",
  unichain = "unichain",
}

/**
 * Network metadata interface containing display and functional information
 * @public
 */
export interface NetworkMetaData {
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
