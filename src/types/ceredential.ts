import { Platform } from "./platform";

export enum CredentialCategory {
  isHuman = "isHuman",
  isRisky = "isRisky",
  isSpam = "isSpam",
}

export enum CredentialSource {
  // isHuman
  talent = "talent",
  binance = "binance",
  coinbase = "coinbase",
  farcasterPro = "farcaster-pro",
  galxePassport = "galxe-passport",
  world_id = "world_id",
  humanPassport = "human-passport",
  zkme = "zkme",
  humanode = "humanode",
  self_xyz = "self_xyz",
  dentity = "dentity",
  // isRisky
  hacker = "hacker",
  hacked = "hacked",
  dmca = "dmca",
  // isSpam
  farcasterSpam = "farcaster-spam",
}

export interface CredentialMetaData {
  platform?: Platform;
  description: string;
  label: string;
  icon: string;
}

export interface CredentialData extends CredentialMetaData {
  id: string;
  category: CredentialCategory;
  dataSource: CredentialSource;
  type: string;
  value: string;
  updatedAt: number | null;
  expiredAt: number | null;
  link: string | null;
}

export interface CredentialResponse {
  [CredentialCategory.isHuman]: CredentialData[] | null;
  [CredentialCategory.isRisky]: CredentialData[] | null;
  [CredentialCategory.isSpam]: CredentialData[] | null;
}
