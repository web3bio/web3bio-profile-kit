import { isIPFS, resolveIPFS_URL } from "./ipfs";

const URL_RESOLVERS = new Map([
  ["data:", (url: string) => url],
  ["https:", (url: string) => url],
  ["ar://", (url: string) => url.replace("ar://", "https://arweave.net/")],
]);

export const resolveMediaURL = (url: string): string => {
  if (!url) return "";

  for (const [prefix, resolver] of URL_RESOLVERS) {
    if (url.startsWith(prefix)) {
      return resolver(url);
    }
  }

  if (isIPFS(url) || url.includes("ipfs:")) {
    return resolveIPFS_URL(url) || "";
  }

  return url;
};
