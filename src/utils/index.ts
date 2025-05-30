export * from "../types/cointype";
export { REGEX } from "./regex";
export { DEFAULT_PLATFORM, PLATFORM_DATA } from "./platform";
export { NETWORK_DATA } from "./network";
export { SOURCE_DATA } from "./source";

export {
  resolveIdentity,
  prettify,
  uglify,
  isSupportedPlatform,
  detectPlatform,
  isSameAddress,
  isWeb3Address,
  isValidEthereumAddress,
  isValidSolanaAddress,
} from "./helpers";
