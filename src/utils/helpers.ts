import { Platform } from "../types";
import { PLATFORM_DATA } from "./platform";
import { REGEX } from "./regex";

export const PROD_API_ENDPOINT = "https://api.web3.bio";
export const STAGING_API_ENDPOINT = "https://api-staging.web3.bio";

const WBE2_PREFIX = [
  Platform.twitter,
  Platform.nextid,
  Platform.keybase,
  Platform.instagram,
  Platform.github,
  Platform.discord,
  Platform.reddit,
  Platform.linkedin,
  Platform.nostr,
  Platform.bluesky,
  Platform.telegram,
];

/**
 * Resolves an identity string to a platform and identifier
 * @param input The identity to resolve
 * @returns A formatted identity string or null if invalid
 */
export const resolveIdentity = (input: string): string | null => {
  if (!input) return null;

  const parts = input.split(",");

  let platform: Platform;
  let identity: string;

  if (parts.length === 2) {
    // Format is already "platform,identity"
    platform = parts[0] as Platform;
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
  // for all web2 platform prettify format as "identity.platform"
  const prefix = input.split(".")[input.split(".").length - 1];
  if (WBE2_PREFIX.includes(prefix as Platform)) {
    return input.replace(`.${prefix}`, "");
  }
  return input;
};
/**
 * Fufill and standardize identity format
 */
export const uglify = (input: string, platform: Platform): string => {
  if (!input) return "";
  switch (platform) {
    case Platform.farcaster:
      return input.endsWith(".farcaster") ||
        input.endsWith(".fcast.id") ||
        input.endsWith(".farcaster.eth")
        ? input
        : `${input}.farcaster`;
    case Platform.lens:
      return input.endsWith(".lens") ? input : `${input}.lens`;
    case Platform.basenames:
      return input.endsWith(".base.eth")
        ? input
        : input.endsWith(".base")
          ? `${input}.eth`
          : `${input}.base.eth`;
    case Platform.linea:
      return input.endsWith(".linea.eth")
        ? input
        : input.endsWith(".linea")
          ? `${input}.eth`
          : `${input}.linea.eth`;
    default:
      return input;
  }
};
/**
 * Check if the platform is supported for API queries
 */
export const isSupportedPlatform = (platform?: Platform | null): boolean => {
  if (!platform) return false;
  return [
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
    Platform.facebook,
    Platform.telegram,
    Platform.keybase,
    Platform.nostr,
    Platform.bluesky,
    Platform.unstoppableDomains,
    Platform.nextid,
    Platform.dotbit,
    Platform.solana,
    Platform.sns,
  ].includes(platform);
};

const platformMap = new Map([
  [REGEX.BASENAMES, Platform.basenames],
  [REGEX.LINEA, Platform.linea],
  [REGEX.ENS, Platform.ens],
  [REGEX.ETH_ADDRESS, Platform.ethereum],
  [REGEX.LENS, Platform.lens],
  [REGEX.UNSTOPPABLE_DOMAINS, Platform.unstoppableDomains],
  [REGEX.SPACE_ID, Platform.space_id],
  [REGEX.DOTBIT, Platform.dotbit],
  [REGEX.SNS, Platform.sns],
  [REGEX.SEEKERID, Platform.seekerid],
  [REGEX.BTC_ADDRESS, Platform.bitcoin],
  [REGEX.SOLANA_ADDRESS, Platform.solana],
  [REGEX.FARCASTER, Platform.farcaster],
  [REGEX.CLUSTER, Platform.clusters],
  [REGEX.NEXT_ID, Platform.nextid],
  [REGEX.NOSTR, Platform.nostr],
  [REGEX.TWITTER, Platform.twitter],
]);
/**
 * Detect platform from identity string based on regex patterns
 */
export const detectPlatform = (term: string): Platform => {
  // support all web2 platform as  identity.platform format
  const prefix = term.split(".")[term.split(".").length - 1];
  if (PLATFORM_DATA.has(prefix as Platform)) return prefix as Platform;
  if (/\.(farcaster\.eth|farcaster|fcast\.id)$/.test(term))
    return Platform.farcaster;

  for (const [regex, Platform] of platformMap) {
    if (regex.test(term)) {
      return Platform;
    }
  }

  return term.includes(".") ? Platform.ens : Platform.farcaster;
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
 * Used for blockchain address comparison where case doesn't affect validity
 *
 * @param address The first address to compare
 * @param otherAddress The second address to compare
 * @returns True if addresses match (ignoring case), false otherwise
 */
export const isSameAddress = (
  address?: string | undefined,
  otherAddress?: string | undefined,
): boolean => {
  if (!address || !otherAddress) return false;
  return address.toLowerCase() === otherAddress.toLowerCase();
};

const web3AddressRegexes = [
  REGEX.ETH_ADDRESS,
  REGEX.BTC_ADDRESS,
  REGEX.SOLANA_ADDRESS,
  REGEX.NEXT_ID,
  REGEX.NOSTR,
];

/**
 * Determines if a string is a valid Web3 address
 * Checks against multiple blockchain address formats
 *
 * @param address The string to check
 * @returns True if the string matches any supported Web3 address format, false otherwise
 */
export const isWeb3Address = (address: string): boolean => {
  if (!address) return false;
  return web3AddressRegexes.some((regex) => regex.test(address));
};

/**
 * Validates if a string is a valid Ethereum address
 * Checks both the address format and excludes common burn/empty addresses
 *
 * @param address - The string to validate as an Ethereum address
 * @returns True if the address is valid and not a burn/empty address, false otherwise
 */
export const isValidEthereumAddress = (address: string): boolean => {
  if (!REGEX.ETH_ADDRESS.test(address)) return false; // invalid ethereum address
  if (address.match(/^0x0*.$|0x[123468abef]*$|0x0*dead$/i)) return false; // empty & burn address
  return true;
};

/**
 * Validates if a string is a valid Solana address
 * Checks if the string matches the Solana address format
 *
 * @param address - The string to validate as a Solana address
 * @returns True if the string is a valid Solana address, false otherwise
 */
export const isValidSolanaAddress = (address: string): boolean => {
  return REGEX.SOLANA_ADDRESS.test(address);
};

/**
 * Converts an identity string to a JSON object with platform and identity
 * @param input The identity to convert
 * @returns An object with platform and identity, or null if invalid
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
  const [_platform, _idenitty] = id.split(",");
  return {
    platform: _platform as Platform,
    identity: _idenitty,
  };
};
