import { Platform } from "../types";
import { isWeb2Platform } from "./platform";
import { REGEX } from "./regex";

export const PROFILE_API_ENDPOINT = "https://api.web3.bio";

const FARCASTER_SUFFIXES = [".farcaster", ".fcast.id", ".farcaster.eth"] as const;
const CHAIN_ALIASES = [".base", ".linea"] as const;
const SOLANA_PLATFORM_SUFFIX = ".solana";

const SUPPORTED_PLATFORMS = new Set([
  Platform.ens,
  Platform.basenames,
  Platform.linea,
  Platform.ethereum,
  Platform.farcaster,
  Platform.lens,
  Platform.twitter,
  Platform.github,
  Platform.discord,
  Platform.linkedin,
  Platform.instagram,
  Platform.reddit,
  Platform.tiktok,
  Platform.facebook,
  Platform.telegram,
  Platform.keybase,
  Platform.nostr,
  Platform.fomo,
  Platform.bluesky,
  Platform.space_id,
  Platform.arbitrum,
  Platform.unstoppableDomains,
  Platform.nextid,
  Platform.solana,
  Platform.sns,
]);

const PLATFORM_PATTERNS = new Map([
  [REGEX.BASENAMES, Platform.basenames],
  [REGEX.LINEA, Platform.linea],
  [REGEX.ENS, Platform.ens],
  [REGEX.ETH_ADDRESS, Platform.ethereum],
  [REGEX.LENS, Platform.lens],
  [REGEX.UNSTOPPABLE_DOMAINS, Platform.unstoppableDomains],
  [REGEX.SPACE_ID, Platform.space_id],
  [REGEX.ARBITRUM, Platform.arbitrum],
  [REGEX.SNS, Platform.sns],
  [REGEX.SEEKERID, Platform.seekerid],
  [REGEX.BTC_ADDRESS, Platform.bitcoin],
  [REGEX.SOLANA_ADDRESS, Platform.solana],
  [REGEX.FARCASTER, Platform.farcaster],
  [REGEX.CLUSTERS, Platform.clusters],
  [REGEX.NEXT_ID, Platform.nextid],
  [REGEX.NOSTR, Platform.nostr],
  [REGEX.TWITTER, Platform.twitter],
]);

const WEB3_ADDRESS_PATTERNS = [
  REGEX.ETH_ADDRESS,
  REGEX.BTC_ADDRESS,
  REGEX.SOLANA_ADDRESS,
  REGEX.TON,
  REGEX.NEXT_ID,
  REGEX.NOSTR,
];

/**
 * Check if the platform is supported for API queries
 */
export const isSupportedPlatform = (platform?: Platform | null): boolean => {
  return !!platform && SUPPORTED_PLATFORMS.has(platform);
};

const endsWithIgnoreCase = (value: string, suffix: string): boolean =>
  value.toLowerCase().endsWith(suffix.toLowerCase());

const matchingSuffix = (
  value: string,
  suffixes: readonly string[],
): string | undefined => suffixes.find((suffix) => endsWithIgnoreCase(value, suffix));

const hasAnySuffix = (value: string, suffixes: readonly string[]): boolean =>
  !!matchingSuffix(value, suffixes);

const stripSuffixIgnoreCase = (value: string, suffix: string): string | null =>
  endsWithIgnoreCase(value, suffix) ? value.slice(0, -suffix.length) : null;

const lastSegment = (value: string): string | null => {
  const lastDotIndex = value.lastIndexOf(".");
  return lastDotIndex === -1 ? null : value.slice(lastDotIndex + 1).toLowerCase();
};

const encodedPlatformFromSuffix = (value: string): Platform | null => {
  const suffix = lastSegment(value);
  if (!suffix || !isSupportedPlatform(suffix as Platform)) return null;
  if (isWeb2Platform(suffix) || suffix === Platform.fomo) return suffix as Platform;
  return null;
};

const stripSolanaPlatformSuffix = (value: string): string | null => {
  const address = stripSuffixIgnoreCase(value, SOLANA_PLATFORM_SUFFIX);
  return address && REGEX.SOLANA_ADDRESS.test(address) ? address : null;
};

const stripWeb2PlatformSuffix = (value: string): string => {
  const platform = encodedPlatformFromSuffix(value);
  if (!platform || !isWeb2Platform(platform)) return value;
  return value.slice(0, -(platform.length + 1));
};

const normalizeChainAliasToEth = (value: string): string => {
  const [name, ...rest] = value.split(".");
  return `${name}.${rest[rest.length - 1].toLowerCase()}.eth`;
};

const withCanonicalSuffix = (
  value: string,
  shortSuffix: string,
  fullSuffix: string,
): string => {
  const fullStem = stripSuffixIgnoreCase(value, fullSuffix);
  if (fullStem !== null) return `${fullStem}${fullSuffix}`;
  const shortStem = stripSuffixIgnoreCase(value, shortSuffix);
  if (shortStem !== null) return `${shortStem}${fullSuffix}`;
  return `${value}${fullSuffix}`;
};

/**
 * Resolves an identity string to a platform and identifier
 * @param input The identity to resolve
 * @returns A formatted identity string or null if invalid
 */
export const resolveIdentity = (input: string): string | null => {
  if (!input) return null;

  const trimmed = input.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(",");

  let platform: Platform | null;
  let identity: string;

  if (parts.length === 2) {
    platform = parts[0].trim().toLowerCase() as Platform;
    identity = prettify(parts[1].trim());
  } else if (parts.length === 1) {
    platform = detectPlatform(trimmed);
    identity = prettify(trimmed);
  } else {
    return null;
  }

  if (!platform || !isSupportedPlatform(platform) || !identity) return null;

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
  if (/^farcaster,#/i.test(input)) return input.replace(/^farcaster,/i, "");

  const farcasterSuffix = matchingSuffix(input, FARCASTER_SUFFIXES);
  if (farcasterSuffix) return input.slice(0, -farcasterSuffix.length);

  const solanaAddress = stripSolanaPlatformSuffix(input);
  if (solanaAddress) return solanaAddress;

  if (hasAnySuffix(input, CHAIN_ALIASES)) return normalizeChainAliasToEth(input);

  return stripWeb2PlatformSuffix(input);
};

/**
 * Fufill and standardize identity format
 */
export const uglify = (input: string, platform: Platform): string => {
  if (!input) return "";
  switch (platform) {
    case Platform.farcaster:
      return hasAnySuffix(input, FARCASTER_SUFFIXES)
        ? input
        : `${input}.farcaster`;
    case Platform.lens:
      return `${stripSuffixIgnoreCase(input, ".lens") ?? input}.lens`;
    case Platform.basenames:
      return withCanonicalSuffix(input, ".base", ".base.eth");
    case Platform.linea:
      return withCanonicalSuffix(input, ".linea", ".linea.eth");
    default:
      return input;
  }
};

/**
 * Detect platform from identity string based on regex patterns
 */
export const detectPlatform = (term: string): Platform | null => {
  const value = term.trim();
  if (!value) return null;

  const encodedPlatform = encodedPlatformFromSuffix(value);
  if (encodedPlatform) return encodedPlatform;

  if (hasAnySuffix(value, FARCASTER_SUFFIXES)) return Platform.farcaster;
  if (stripSolanaPlatformSuffix(value)) return Platform.solana;

  for (const [regex, platform] of PLATFORM_PATTERNS) {
    if (regex.test(value)) return platform;
  }

  return value.includes(".") ? Platform.ens : Platform.farcaster;
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

/**
 * Compare two addresses for equality in a case-insensitive manner
 */
export const isSameAddress = (
  address?: string | undefined,
  otherAddress?: string | undefined,
): boolean => {
  return !!address && !!otherAddress && address.toLowerCase() === otherAddress.toLowerCase();
};

/**
 * Determines if a string is a valid Web3 address
 */
export const isWeb3Address = (address: string): boolean => {
  return !!address && WEB3_ADDRESS_PATTERNS.some((regex) => regex.test(address));
};

/**
 * Validates if a string is a valid Ethereum address
 */
export const isValidEthereumAddress = (address: string): boolean => {
  if (!REGEX.ETH_ADDRESS.test(address)) return false;
  if (/^0x0*.$|^0x[123468abef]*$|^0x0*dead$/i.test(address)) return false;
  return true;
};

/**
 * Validates if a string is a valid Solana address
 */
export const isValidSolanaAddress = (address: string): boolean => {
  return !!address && REGEX.SOLANA_ADDRESS.test(address);
};

/**
 * Converts an identity string to a JSON object with platform and identity
 *
 * @example
 * idToJson("ens,sujiyan.eth") // { platform: "ens", identity: "sujiyan.eth" }
 * idToJson("suji.farcaster") // { platform: "farcaster", identity: "suji" }
 * idToJson("suji.base") // { platform: "basenames", identity: "suji.base.eth" }
 */
export const idToJson = (
  input: string,
): { platform: Platform; identity: string } | null => {
  const id = resolveIdentity(input);
  if (!id) return null;

  const separatorIndex = id.indexOf(",");
  if (separatorIndex === -1) return null;

  return {
    platform: id.slice(0, separatorIndex) as Platform,
    identity: id.slice(separatorIndex + 1),
  };
};
