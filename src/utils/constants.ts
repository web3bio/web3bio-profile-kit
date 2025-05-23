export const API_ENDPOINT = "https://api.web3.bio";

export enum ErrorMessages {
  NOT_FOUND = "Not Found",
  INVALID_RESOLVER = "Invalid Resolver Address",
  INVALID_RESOLVED = "Invalid Resolved Address",
  NOT_EXIST = "Does Not Exist",
  INVALID_IDENTITY = "Invalid Identity or Domain",
  INVALID_ADDRESS = "Invalid Address",
  UNKNOWN_ERROR = "Unknown Error Occurred",
  NETWORK_ERROR = "Network Error",
}

export enum QueryEndpoint {
  NS = "ns",
  PROFILE = "profile",
  DOMAIN = "domain",
}

// Regular expressions for identity detection
export const REGEX = {
  ENS: /^.+\.(eth|xyz|bio|app|luxe|kred|art|ceo|club|box)$/i,
  BASENAMES: /^.+\.base(\.eth)?$/i,
  LINEA: /^.+\.linea(\.eth)?$/i,
  FARCASTER: /^(?:[A-Za-z0-9_-]{1,61}(?:(?:\.eth)?(?:\.farcaster|\.fcast\.id|\.farcaster\.eth)?)?|farcaster,#\d+)$/i,
  LENS: /^(?:.+\.lens)$/i,
  CLUSTER: /^[\w-]+\/[\w-]+$/,
  SPACE_ID: /^.+\.(bnb|arb)$/i,
  GENOME: /^.+\.gno$/i,
  UNSTOPPABLE_DOMAINS: /^.+\.(crypto|888|nft|blockchain|bitcoin|dao|x|klever|hi|zil|kresus|polygon|wallet|binanceus|anime|go|manga|eth)$/i,
  CROSSBELL: /^.+\.csb$/i,
  DOTBIT: /^.+\.bit$/i,
  SNS: /^.+\.sol$/i,
  ETH_ADDRESS: /^0x[a-fA-F0-9]{40}$/i,
  BTC_ADDRESS: /\b([13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[qp][a-z0-9]{11,71})\b/,
  SOLANA_ADDRESS: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
  LOWERCASE_EXEMPT: /\b(?:(?:[13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[qp][a-z0-9]{11,71})|(?:[1-9A-HJ-NP-Za-km-z]{32,44}))\b/,
  TWITTER: /^[A-Za-z0-9_]{1,15}(?:\.twitter)?$/i,
  NEXT_ID: /^0x[a-f0-9]{66}(?:\.nextid)?$/i,
};