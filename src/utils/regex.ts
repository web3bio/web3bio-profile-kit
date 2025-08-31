/**
 * Regex Group
 * @public
 */
export const REGEX = {
  ENS: /^.+\.(?:eth|xyz|bio|app|luxe|kred|art|ceo|club|box|uni\.eth|cb\.id)$/i,
  BASENAMES: /^.+\.base(\.eth)?$/i,
  LINEA: /^.+\.linea(\.eth)?$/i,
  FARCASTER:
    /^(?:[A-Za-z0-9_-]{1,61}(?:\.(?:eth|farcaster|fcast\.id|farcaster\.eth))?|farcaster,#\d+)$/i,
  LENS: /^.+\.lens$/i,
  CLUSTER: /^[\w-]+\/[\w-]+$/,
  SPACE_ID: /^.+\.(?:bnb|arb)$/i,
  SEEKERID: /^.+\.skr$/i,
  UNSTOPPABLE_DOMAINS:
    /^.+\.(?:crypto|888|nft|blockchain|bitcoin|dao|x|klever|hi|zil|kresus|polygon|wallet|binanceus|anime|go|manga|eth)$/i,
  DOTBIT: /^.+\.bit$/i,
  SNS: /^.+\.sol$/i,
  ETH_ADDRESS: /^0x[a-fA-F0-9]{40}$/i,
  BTC_ADDRESS: /^(?:[13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[qp][a-z0-9]{11,71})$/,
  SOLANA_ADDRESS: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
  LOWERCASE_EXEMPT:
    /^(?:[13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[qp][a-z0-9]{11,71}|[1-9A-HJ-NP-Za-km-z]{32,44})$/,
  TWITTER: /^[A-Za-z0-9_]{1,15}(?:\.twitter)?$/i,
  NEXT_ID: /^0x[a-f0-9]{66}(?:\.nextid)?$/i,
  EIP: /^eip155:(\d+)\/(erc1155|erc721):(.+)\/(.+)$/i,
  DOMAIN: /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/,
  TON: /^(EQ|UQ)[a-zA-Z0-9_-]{46}$/,
  NOSTR: /^(npub1|nsec1)[0-9a-z]{58,59}$|^[0-9a-f]{64}$/i,
  EMOJI:
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi,
};
