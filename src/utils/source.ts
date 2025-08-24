import { Source, type SourceType } from "../types/source";
/**
 * Source data
 * @public
 */
export const SOURCE_DATA: Readonly<Record<Source, SourceType>> = {
  [Source.basenames]: {
    name: "Basenames",
    description: "The domain system on Base",
  },
  [Source.camp_network]: {
    name: "Camp Network",
    description: "Modernize intellectual property infrastructure",
  },
  [Source.clusters]: {
    name: "Clusters",
    description: "On-chain social protocol",
  },
  [Source.crowdsourcing]: {
    name: "Crowdsourcing",
    description: "Crowdsourcing",
  },
  [Source.dentity]: {
    name: "Dentity",
    description: "Digital Credentials",
  },
  [Source.dotbit]: {
    name: ".bit",
    description: "Decentralized cross-chain identity system",
  },
  [Source.ens]: {
    name: "ENS",
    description: "Ethereum Name Service",
  },
  [Source.ethereum]: {
    name: "Ethereum",
    description: "Ethereum",
  },
  [Source.farcaster]: {
    name: "Farcaster",
    description: "Decentralized social network protocol",
  },
  [Source.firefly]: {
    name: "Firefly",
    description: "Web3 social platform",
  },
  [Source.foundation]: {
    name: "Foundation",
    description: "NFT marketplace",
  },
  [Source.gallery]: {
    name: "Gallery",
    description: "Show your collection to the world",
  },
  [Source.gmgn]: {
    name: "GMGN",
    description: "Web3 social platform",
  },
  [Source.icebreaker]: {
    name: "Icebreaker",
    description: "Open professional network",
  },
  [Source.justaname]: {
    name: "JustaName",
    description: "Identity infrastructure",
  },
  [Source.keybase]: {
    name: "Keybase",
    description: "Secure messaging and file-sharing",
  },
  [Source.lens]: {
    name: "Lens",
    description: "Web3 social graph protocol",
  },
  [Source.linea]: {
    name: "Linea",
    description: "L2 based on ZK",
  },
  [Source.mirror]: {
    name: "Mirror",
    description: "Decentralized publishing protocol",
  },
  [Source.nextid]: {
    name: "Next.ID",
    description: "Decentralized identity protocol",
  },
  [Source.nftd]: {
    name: "NF.TD",
    description: "Be your own checkmark",
  },
  [Source.nostr]: {
    name: "Nostr",
    description: "Web3 social platform",
  },
  [Source.opensea]: {
    name: "OpenSea",
    description: "NFT marketplace",
  },
  [Source.paragraph]: {
    name: "Paragraph",
    description: "Decentralized publishing protocol",
  },
  [Source.particle]: {
    name: "Particle",
    description: "Particle",
  },
  [Source.rarible]: {
    name: "Rarible",
    description: "NFT marketplace",
  },
  [Source.rss3]: {
    name: "RSS3",
    description: "Open information syndication protocol",
  },
  [Source.seekerid]: {
    name: "Seeker ID",
    description: "Solana Mobile Identity",
  },
  [Source.sns]: {
    name: "SNS",
    description: "Solana Name Service",
  },
  [Source.solana]: {
    name: "Solana",
    description: "High-performance blockchain",
  },
  [Source.soundxyz]: {
    name: "Sound.xyz",
    description: "Decentralized audio platform",
  },
  [Source.space_id]: {
    name: "SpaceID",
    description: "Multi-chain name service",
  },
  [Source.talentprotocol]: {
    name: "Talent",
    description: "Decentralized onchain passport",
  },
  [Source.tally]: {
    name: "Tally",
    description: "Launch, manage, and grow the value of your token",
  },
  [Source.twitter]: {
    name: "Twitter (X)",
    description: "Twitter (X) social platform",
  },
  [Source.unstoppabledomains]: {
    name: "Unstoppable Domains",
    description: "Blockchain domain name provider",
  },
  [Source.zora]: {
    name: "Zora",
    description: "A social network where every post is a coin",
  },
};
/**
 * Gets source metadata for a given source key
 * @param sourceKey - The source identifier to look up
 * @returns Source metadata including name and description
 * @public
 */
export const getSource = (sourceKey: Source): SourceType =>
  SOURCE_DATA[sourceKey] || { name: sourceKey, description: "Unknown source" };
