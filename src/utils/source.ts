import { Source, type SourceType } from "../types/source";
/**
 * Source data
 * @public
 */
export const SOURCE_DATA: Readonly<Record<Source, SourceType>> = {
  [Source.basenames]: {
    name: "Basenames",
    description: "The domain system on Base",
    icon: "icons/icon-base.svg",
  },
  [Source.camp_network]: {
    name: "Camp Network",
    description: "Modernize intellectual property infrastructure",
  },
  [Source.clusters]: {
    name: "Clusters",
    description: "On-chain social protocol",
    icon: "icons/icon-clusters.svg",
  },
  [Source.crowdsourcing]: {
    name: "Crowdsourcing",
    description: "Crowdsourcing",
  },
  [Source.dentity]: {
    name: "Dentity",
    description: "Digital credentials",
    icon: "icons/icon-dentity.svg",
  },
  [Source.dotbit]: {
    name: ".bit",
    description: "Decentralized cross-chain identity system",
    icon: "icons/icon-dotbit.svg",
  },
  [Source.ens]: {
    name: "ENS",
    description: "Ethereum Name Service",
    icon: "icons/icon-ens.svg",
  },
  [Source.ethereum]: {
    name: "Ethereum",
    description: "Ethereum",
    icon: "icons/icon-ethereum.svg",
  },
  [Source.exchange_art]: {
    name: "Exchange Art",
    description: "A digital art marketplace",
    icon: "icons/icon-exchangeArt.svg",
  },
  [Source.farcaster]: {
    name: "Farcaster",
    description: "Decentralized social network protocol",
    icon: "icons/icon-farcaster.svg",
  },
  [Source.firefly]: {
    name: "Firefly",
    description: "Web3 social platform",
    icon: "icons/icon-firefly.svg",
  },
  [Source.foundation]: {
    name: "Foundation",
    description: "NFT marketplace",
    icon: "icons/icon-foundation.svg",
  },
  [Source.gallery]: {
    name: "Gallery",
    description: "Show your collection to the world",
    icon: "icons/icon-gallery.svg",
  },
  [Source.gmgn]: {
    name: "GMGN",
    description: "Web3 social platform",
    icon: "icons/icon-gmgn.svg",
  },
  [Source.icebreaker]: {
    name: "Icebreaker",
    description: "Open professional network",
    icon: "icons/icon-icebreaker.svg",
  },
  [Source.justaname]: {
    name: "JustaName",
    description: "Identity infrastructure",
    icon: "icons/icon-justaname.svg",
  },
  [Source.keybase]: {
    name: "Keybase",
    description: "Secure messaging and file-sharing",
    icon: "icons/icon-keybase.svg",
  },
  [Source.lens]: {
    name: "Lens",
    description: "Web3 social graph protocol",
    icon: "icons/icon-lens.svg",
  },
  [Source.linea]: {
    name: "Linea",
    description: "L2 based on ZK",
    icon: "icons/icon-linea.svg",
  },
  [Source.metopia]: {
    name: "Metopia",
    description: "Web3 identity & learning platform",
    icon: "icons/icon-metopia.svg",
  },
  [Source.mirror]: {
    name: "Mirror",
    description: "Decentralized publishing protocol",
    icon: "icons/icon-mirror.svg",
  },
  [Source.nextid]: {
    name: "Next.ID",
    description: "Decentralized identity protocol",
    icon: "icons/icon-nextid.svg",
  },
  [Source.nftd]: {
    name: "NF.TD",
    description: "Be your own checkmark",
    icon: "icons/icon-nftd.svg",
  },
  [Source.nostr]: {
    name: "Nostr",
    description: "Web3 social platform",
    icon: "icons/icon-nostr.svg",
  },
  [Source.opensea]: {
    name: "OpenSea",
    description: "NFT marketplace",
    icon: "icons/icon-opensea.svg",
  },
  [Source.paragraph]: {
    name: "Paragraph",
    description: "Decentralized publishing protocol",
    icon: "icons/icon-paragraph.svg",
  },
  [Source.particle]: {
    name: "Particle",
    description: "Particle",
    icon: "icons/icon-particle.svg",
  },
  [Source.rarible]: {
    name: "Rarible",
    description: "NFT marketplace",
    icon: "icons/icon-rarible.svg",
  },
  [Source.rey]: {
    name: "Rey",
    description: "The world's attention marketplace",
    icon: "icons/icon-rey.svg",
  },
  [Source.rss3]: {
    name: "RSS3",
    description: "Open information syndication protocol",
    icon: "icons/icon-rss3.svg",
  },
  [Source.seekerid]: {
    name: "Seeker ID",
    description: "Solana Mobile Identity",
    icon: "icons/icon-seekerid.svg",
  },
  [Source.sns]: {
    name: "SNS",
    description: "Solana Name Service",
    icon: "icons/icon-sns.svg",
  },
  [Source.solana]: {
    name: "Solana",
    description: "High-performance blockchain",
    icon: "icons/icon-solana.svg",
  },
  [Source.soundxyz]: {
    name: "Sound.xyz",
    description: "Decentralized audio platform",
    icon: "icons/icon-soundxyz.svg",
  },
  [Source.space_id]: {
    name: "SpaceID",
    description: "Multi-chain name service",
    icon: "icons/icon-spaceid.svg",
  },
  [Source.talentprotocol]: {
    name: "Talent",
    description: "Decentralized onchain passport",
    icon: "icons/icon-talent.svg",
  },
  [Source.tally]: {
    name: "Tally",
    description: "Launch, manage, and grow the value of your token",
    icon: "icons/icon-tally.svg",
  },

  [Source.twitter]: {
    name: "Twitter (X)",
    description: "Twitter (X) social platform",
    icon: "icons/icon-twitter.svg",
  },
  [Source.unstoppabledomains]: {
    name: "Unstoppable Domains",
    description: "Blockchain domain name provider",
    icon: "icons/icon-unstoppabledomains.svg",
  },
  [Source.zora]: {
    name: "Zora",
    description: "A social network where every post is a coin",
    icon: "icons/icon-zora.svg",
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
