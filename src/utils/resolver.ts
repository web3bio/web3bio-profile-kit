import { isIPFS, resolveIPFS_URL } from "./ipfs";

const DIRECT_MEDIA_PREFIXES = ["data:", "https:"] as const;

export const resolveMediaURL = (url: string): string => {
  if (!url) return "";

  // Fast path for common protocols.
  if (DIRECT_MEDIA_PREFIXES.some((prefix) => url.startsWith(prefix))) {
    return url;
  }

  // Handle Arweave
  if (url.startsWith("ar://")) {
    return url.replace("ar://", "https://arweave.net/");
  }

  // Handle IPFS
  if (url.includes("ipfs:") || isIPFS(url)) {
    return resolveIPFS_URL(url) || "";
  }

  return url;
};
