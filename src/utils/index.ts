export * from "../types/cointype";
export { REGEX } from "./regex";
export { DEFAULT_PLATFORM, PLATFORM_DATA, getPlatform } from "./platform";
export { NETWORK_DATA, getNetwork } from "./network";
export { SOURCE_DATA, getSource } from "./source";

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
