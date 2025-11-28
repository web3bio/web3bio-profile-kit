const IPFS_CID_PATTERN =
  "Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[2-7A-Za-z]{58,}|B[2-7A-Z]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[\\dA-F]{50,}";
const CORS_HOST = "https://cors-next.r2d2.to";
const CF_IPFS_HOST = "https://cloudflare-ipfs.com";
const IPFS_GATEWAY_HOST = "https://ipfs.io";

const MATCH_IPFS_DATA_RE = /ipfs\/(data:.*)$/;
const MATCH_IPFS_CID_RE = new RegExp(IPFS_CID_PATTERN);
const MATCH_IPFS_CID_AT_STARTS_RE = new RegExp(
  `^https://(?:${IPFS_CID_PATTERN})`,
);
const MATCH_IPFS_CID_AND_PATHNAME_RE = new RegExp(
  `(?:${IPFS_CID_PATTERN})(?:/.*)?`,
);
const CORS_HOST_RE = new RegExp(`^(?:${CORS_HOST}|${CF_IPFS_HOST})\\??`);

export const resolveIPFS_CID = (str: string) =>
  str.match(MATCH_IPFS_CID_RE)?.[0];

export const isIPFS = (str: string) => MATCH_IPFS_CID_RE.test(str);

export function resolveIPFS_URL(
  cidOrURL: string | undefined | null,
): string | undefined | null {
  if (!cidOrURL) return cidOrURL;

  // Normalize input by trimming and decoding
  const queryIndex = cidOrURL.indexOf("?");
  let normalizedURL = decodeURIComponent(
    queryIndex !== -1 ? cidOrURL.slice(0, queryIndex) : cidOrURL,
  );

  // Handle CORS proxies first
  if (
    normalizedURL.startsWith(CORS_HOST) ||
    normalizedURL.startsWith(CF_IPFS_HOST)
  ) {
    normalizedURL = normalizedURL.replace(CORS_HOST_RE, "");
    // Continue processing the URL without the proxy prefix
  }

  // Handle ipfs.io URLs
  if (normalizedURL.startsWith("https://ipfs.io")) {
    const dataMatch = normalizedURL.match(MATCH_IPFS_DATA_RE);
    if (dataMatch?.[1]) {
      return decodeURIComponent(dataMatch[1]);
    }
    return normalizedURL;
  }

  // Handle ipfs protocol and CIDs
  if (normalizedURL.includes("ipfs:") || isIPFS(normalizedURL)) {
    // Convert ipfs:// protocol to CID format
    if (normalizedURL.startsWith("ipfs://")) {
      normalizedURL = normalizedURL.slice(7);
    }

    // Handle URLs that start with a CID
    if (MATCH_IPFS_CID_AT_STARTS_RE.test(normalizedURL)) {
      try {
        const url = new URL(normalizedURL);
        const cid = resolveIPFS_CID(normalizedURL);

        if (cid) {
          const path = url.pathname === "/" ? "" : url.pathname;
          return `${IPFS_GATEWAY_HOST}/ipfs/${cid}${path}`;
        }
      } catch (error) {
        console.debug("Failed to parse URL with CID", { normalizedURL, error });
      }
    }

    // Handle bare CIDs or CIDs with paths
    const pathMatch = normalizedURL.match(MATCH_IPFS_CID_AND_PATHNAME_RE);
    if (pathMatch?.[0]) {
      return `${IPFS_GATEWAY_HOST}/ipfs/${pathMatch[0]}`;
    }
  }

  return normalizedURL;
}
