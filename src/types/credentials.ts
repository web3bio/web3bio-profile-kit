import { Platform } from "./platform";

export enum CredentialsCategory {
  isHuman = "isHuman",
  isRisky = "isRisky",
  isSpam = "isSpam",
}

export interface CredentialsData {
  category: CredentialsCategory;
  dataSource: string;
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
