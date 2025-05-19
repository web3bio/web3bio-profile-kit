import {
  regexLowercaseExempt,
  regexBasenames,
  regexEns,
  regexLinea,
  regexLens,
  regexFarcaster,
  regexUnstoppableDomains,
  regexEth,
  regexSpaceid,
  regexDotbit,
  regexCrossbell,
  regexSns,
  regexGenome,
  regexBtc,
  regexSolana,
  regexCluster,
  regexTwitter,
  regexNext,
} from "./regexp";
import { PlatformType } from "./types";

export const PROFILE_API_ENDPOINT = "https://api-staging.web3.bio";

export const resolveIdentity = (input: string): string | null => {
  if (!input) return null;

  const parts = input.split(",");

  let platform: PlatformType;
  let identity: string;

  if (parts.length === 2) {
    [platform, identity] = parts as [PlatformType, string];
    identity = prettify(identity);
  } else if (parts.length === 1) {
    platform = handleSearchPlatform(input);
    identity = prettify(input);
  } else {
    return null;
  }

  if (!shouldPlatformFetch(platform) || !identity) return null;

  const normalizedIdentity = regexLowercaseExempt.test(identity)
    ? identity
    : identity.toLowerCase();

  return `${platform},${normalizedIdentity}`;
};

const prettify = (input: string): string => {
  if (!input) return "";
  if (input.endsWith(".twitter")) return input.replace(".twitter", "");
  if (input.endsWith(".nextid")) return input.replace(".nextid", "");
  if (input.startsWith("farcaster,#"))
    return input.replace(/^(farcaster),/, "");
  if (
    input.endsWith(".farcaster") ||
    input.endsWith(".fcast.id") ||
    input.endsWith(".farcaster.eth")
  ) {
    return input.replace(/(\.farcaster|\.fcast\.id|\.farcaster\.eth)$/, "");
  }
  if (input.endsWith(".base") || input.endsWith(".linea")) {
    return input.split(".")[0] + "." + input.split(".").pop() + ".eth";
  }
  return input;
};

const shouldPlatformFetch = (platform?: PlatformType | null) => {
  if (!platform) return false;
  return [
    PlatformType.ens,
    PlatformType.basenames,
    PlatformType.linea,
    PlatformType.ethereum,
    PlatformType.twitter,
    PlatformType.farcaster,
    PlatformType.lens,
    PlatformType.unstoppableDomains,
    PlatformType.nextid,
    PlatformType.dotbit,
    PlatformType.solana,
    PlatformType.sns,
  ].includes(platform);
};

const platformMap = new Map([
  [regexBasenames, PlatformType.basenames],
  [regexLinea, PlatformType.linea],
  [regexEns, PlatformType.ens],
  [regexEth, PlatformType.ethereum],
  [regexLens, PlatformType.lens],
  [regexUnstoppableDomains, PlatformType.unstoppableDomains],
  [regexSpaceid, PlatformType.space_id],
  [regexCrossbell, PlatformType.crossbell],
  [regexDotbit, PlatformType.dotbit],
  [regexSns, PlatformType.sns],
  [regexGenome, PlatformType.genome],
  [regexBtc, PlatformType.bitcoin],
  [regexSolana, PlatformType.solana],
  [regexFarcaster, PlatformType.farcaster],
  [regexCluster, PlatformType.clusters],
  [regexTwitter, PlatformType.twitter],
  [regexNext, PlatformType.nextid],
]);

export const handleSearchPlatform = (term: string) => {
  if (term.endsWith(".farcaster.eth")) return PlatformType.farcaster;
  for (const [regex, platformType] of platformMap as any) {
    if (regex.test(term)) {
      return platformType;
    }
  }
  return term.includes(".") ? PlatformType.ens : PlatformType.farcaster;
};
