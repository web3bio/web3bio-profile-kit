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

export interface CredentialsMetaData {
  platform: Platform;
  description: string;
  label: string;
  icon: string;
}

export interface CredentialsData extends CredentialsMetaData {
  id: string;
  category: CredentialsCategory;
  dataSource: CredentialsType;
  type: string;
  value: string;
  updatedAt: number | null;
  expiredAt: number | null;
  link: string | null;
}

export interface CredentialsResponse {
  [CredentialsCategory.isHuman]: CredentialsData | null;
  [CredentialsCategory.isRisky]: CredentialsData | null;
  [CredentialsCategory.isSpam]: CredentialsData | null;
}
