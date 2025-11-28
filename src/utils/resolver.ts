import { isIPFS, resolveIPFS_URL } from "./ipfs";

export const resolveMediaURL = (url: string): string => {
  if (!url) return "";

  // Fast path for common protocols
  if (url.startsWith("data:") || url.startsWith("https:")) {
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
