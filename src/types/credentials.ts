import { Platform } from "./platform";

export enum CredentialsCategory {
  isHuman = "isHuman",
  isRisky = "isRisky",
  isSpam = "isSpam",
}

export enum CredentialsType {
  // isHuman
  dentity = "dentity",
  talent = "talent",
  human = "human",
  // isRisky
  hacker = "hacker",
  hacked = "hacked",
  dmca = "dmca",
  // isSpam
  warpcast = "warpcast",
}
export interface CredentialsData {
  category: CredentialsCategory;
  dataSource: CredentialsType;
  platform: Platform;
  type: string;
  value: string;
  updatedAt: string;
  description?: string;
  label?: string;
  icon?: string;
  link?: string;
}

export interface CredentialsResponse {
  [CredentialsCategory.isHuman]: CredentialsData | null;
  [CredentialsCategory.isRisky]: CredentialsData | null;
  [CredentialsCategory.isSpam]: CredentialsData | null;
}
