import { METADATA_API_ENDPOINT } from "./helpers";
import { isIPFS_Resource, resolveIPFS_URL } from "./ipfs";
import { getNetwork } from "./network";
import { REGEX } from "./regex";

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

  if (isIPFS_Resource(url) || url.includes("ipfs:")) {
    return resolveIPFS_URL(url) || "";
  }

  return url;
};

export const resolveEipAssetURL = async (
  source: string,
): Promise<string | null> => {
  if (!source) return null;
  const match = source.match(REGEX.EIP);
  if (!match) return resolveMediaURL(source);
  const [, chainId, , contractAddress, tokenId] = match;
  if (!contractAddress || !tokenId) {
    return resolveMediaURL(source);
  }

  const network = getNetwork(Number(chainId))?.key;

  if (!network) {
    return resolveMediaURL(source);
  }

  const fetchURL = `${METADATA_API_ENDPOINT}/api/nft/nft/${network}.${contractAddress}.${tokenId}`;
  try {
    const response = await fetch(fetchURL);
    if (!response.ok) return null;
    const data = await response.json();
    return data?.image_url || null;
  } catch {
    return null;
  }
};
