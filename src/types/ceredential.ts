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

export interface CredentialType {
  id: string;
  platform: Platform;
  category: CredentialCategory;
  credentialSource: CredentialSource;
  credentialType: string;
  credentialValue: string;
  label: string;
  description: string;
  link: string | null;
  updatedAt: number | null;
  expiredAt: number | null;
}

export interface CredentialResponse {
  [CredentialCategory.isHuman]: CredentialType[] | null;
  [CredentialCategory.isRisky]: CredentialType[] | null;
  [CredentialCategory.isSpam]: CredentialType[] | null;
}
