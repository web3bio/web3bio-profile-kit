import { REGEX } from "./constants";
import { PlatformType, Identity } from "./types";

/**
 * Resolves an identity string to a platform and identifier
 * @param input The identity to resolve
 * @returns A formatted identity string or null if invalid
 */
export const resolveIdentity = (input: string): string | null => {
  if (!input) return null;

  const parts = input.split(",");

  let platform: PlatformType;
  let identity: string;

  if (parts.length === 2) {
    // Format is already "platform,identity"
    platform = parts[0] as PlatformType;
    identity = prettify(parts[1]);
  } else if (parts.length === 1) {
    // Auto-detect platform from the identity string
    platform = detectPlatform(input);
    identity = prettify(input);
  } else {
    return null;
  }

  if (!isSupportedPlatform(platform) || !identity) return null;

  // Normalize case except for case-sensitive identities
  const normalizedIdentity = REGEX.LOWERCASE_EXEMPT.test(identity)
    ? identity
    : identity.toLowerCase();

  return `${platform},${normalizedIdentity}`;
};

/**
 * Clean up and standardize identity format
 */
export const prettify = (input: string): string => {
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

/**
 * Check if the platform is supported for API queries
 */
export const isSupportedPlatform = (
  platform?: PlatformType | null,
): boolean => {
  if (!platform) return false;
  return Object.values(PlatformType).includes(platform as PlatformType);
};

/**
 * Detect platform from identity string based on regex patterns
 */
export const detectPlatform = (term: string): PlatformType => {
  if (term.endsWith(".farcaster.eth")) return PlatformType.farcaster;

  const platformMap: [RegExp, PlatformType][] = [
    [REGEX.BASENAMES, PlatformType.basenames],
    [REGEX.LINEA, PlatformType.linea],
    [REGEX.ENS, PlatformType.ens],
    [REGEX.ETH_ADDRESS, PlatformType.ethereum],
    [REGEX.LENS, PlatformType.lens],
    [REGEX.UNSTOPPABLE_DOMAINS, PlatformType.unstoppableDomains],
    [REGEX.SPACE_ID, PlatformType.space_id],
    [REGEX.DOTBIT, PlatformType.dotbit],
    [REGEX.SNS, PlatformType.sns],
    [REGEX.BTC_ADDRESS, PlatformType.bitcoin],
    [REGEX.SOLANA_ADDRESS, PlatformType.solana],
    [REGEX.FARCASTER, PlatformType.farcaster],
    [REGEX.TWITTER, PlatformType.twitter],
    [REGEX.NEXT_ID, PlatformType.nextid],
  ];

  for (const [regex, platformType] of platformMap) {
    if (regex.test(term)) {
      return platformType;
    }
  }

  // Default fallback
  return term.includes(".") ? PlatformType.ens : PlatformType.farcaster;
};

/**
 * Get API key from various environment sources or user provided value
 */
export const getApiKey = (userProvidedKey?: string): string | undefined => {
  return (
    userProvidedKey ||
    process.env.WEB3BIO_API_KEY ||
    process.env.REACT_APP_WEB3BIO_API_KEY ||
    process.env.NEXT_PUBLIC_WEB3BIO_API_KEY ||
    process.env.VITE_WEB3BIO_API_KEY
  );
};
