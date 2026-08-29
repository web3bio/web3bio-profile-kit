import { Platform } from "./platform";

export enum CredentialCategory {
  isHuman = "isHuman",
  isRisky = "isRisky",
  isSpam = "isSpam",
}

export enum CredentialSource {
  // isHuman
  binance = "binance",
  coinbase = "coinbase",
  dentity = "dentity",
  ethos = "ethos",
  farcasterPro = "farcaster-pro",
  galxePassport = "galxe-passport",
  humanode = "humanode",
  humanPassport = "human-passport",
  self_xyz = "self_xyz",
  talent = "talent",
  world_id = "world_id",
  zkme = "zkme",
  // isRisky
  dmca = "dmca",
  hacked = "hacked",
  hacker = "hacker",
  // isSpam
  farcasterSpam = "farcaster-spam",
}

export interface CredentialType {
  id: string;
  platform: Platform;
  category: CredentialCategory;
  credentialSource: CredentialSource;
  type: string;
  value: string;
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
