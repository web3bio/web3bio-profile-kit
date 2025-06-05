import { Source, type SourceType } from "../types/source";
/**
 * Source data
 * @public
 */
export const SOURCE_DATA: Readonly<Record<Source, SourceType>> = {
  [Source.ethereum]: {
    name: "Ethereum",
    description: "Ethereum",
  },
  [Source.ens]: {
    name: "ENS",
    description: "Ethereum Name Service",
  },
  [Source.twitter]: {
    name: "Twitter (X)",
    description: "Twitter (X) social platform",
  },
  [Source.keybase]: {
    name: "Keybase",
    description: "Secure messaging and file-sharing",
  },
  [Source.nextid]: {
    name: "Next.ID",
    description: "Decentralized identity protocol",
  },
  [Source.rss3]: {
    name: "RSS3",
    description: "Open information syndication protocol",
  },
  [Source.dotbit]: {
    name: ".bit",
    description: "Decentralized cross-chain identity system",
  },
  [Source.unstoppabledomains]: {
    name: "Unstoppable Domains",
    description: "Blockchain domain name provider",
  },
  [Source.lens]: {
    name: "Lens",
    description: "Web3 social graph protocol",
  },
  [Source.farcaster]: {
    name: "Farcaster",
    description: "Decentralized social network protocol",
  },
  [Source.space_id]: {
    name: "SpaceID",
    description: "Multi-chain name service",
  },
  [Source.gravity]: {
    name: "Gravity",
    description: "Gravity alpha mainnet name service",
  },
  [Source.clusters]: {
    name: "Clusters",
    description: "On-chain social protocol",
  },
  [Source.solana]: {
    name: "Solana",
    description: "High-performance blockchain",
  },
  [Source.sns]: {
    name: "SNS",
    description: "Solana Name Service",
  },
  [Source.opensea]: {
    name: "OpenSea",
    description: "NFT marketplace",
  },
  [Source.firefly]: {
    name: "Firefly",
    description: "Web3 social platform",
  },
  [Source.basenames]: {
    name: "Basenames",
    description: "The domain system on Base",
  },
  [Source.dentity]: {
    name: "Dentity",
    description: "Digital Credentials",
  },
  [Source.nftd]: {
    name: "NF.TD",
    description: "Be your own checkmark",
  },
  [Source.mirror]: {
    name: "Mirror",
    description: "Decentralized publishing protocol",
  },
  [Source.paragraph]: {
    name: "Paragraph",
    description: "Decentralized publishing protocol",
  },
  [Source.foundation]: {
    name: "Foundation",
    description: "NFT marketplace",
  },
  [Source.rarible]: {
    name: "Rarible",
    description: "NFT marketplace",
  },
  [Source.soundxyz]: {
    name: "Sound.xyz",
    description: "Decentralized audio platform",
  },
  [Source.linea]: {
    name: "Linea",
    description: "L2 based on ZK",
  },
  [Source.gmgn]: {
    name: "GMGN",
    description: "Web3 social platform",
  },
  [Source.nostr]: {
    name: "Nostr",
    description: "Web3 social platform",
  },
  [Source.talentprotocol]: {
    name: "Talent",
    description: "Decentralized onchain passport",
  },
  [Source.crowdsourcing]: {
    name: "Crowdsourcing",
    description: "Crowdsourcing",
  },
  [Source.particle]: {
    name: "Particle",
    description: "Particle",
  },
  [Source.tally]: {
    name: "Tally",
    description: "Launch, manage, and grow the value of your token",
  },
  [Source.icebreaker]: {
    name: "Icebreaker",
    description: "Open professional network",
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
