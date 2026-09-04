import { Platform } from "../types";
import {
  detectPlatform,
  idToJson,
  isSameAddress,
  isSupportedPlatform,
  isValidEthereumAddress,
  isValidSolanaAddress,
  isWeb3Address,
  prettify,
  resolveIdentity,
  uglify,
} from "../utils/helpers";

const SOLANA = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";
const ETHEREUM = "0x1234567890123456789012345678901234567890";
const NEXT_ID = `0x${"ab".repeat(33)}`;
const BTC = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
const TON = `EQ${"A".repeat(46)}`;
const NOSTR = `npub1${"a".repeat(58)}`;

describe("detectPlatform", () => {
  it.each([
    ["alice.twitter", Platform.twitter],
    ["alice.github", Platform.github],
    ["alice.GITHUB", Platform.github],
    ["alice.discord", Platform.discord],
    ["alice.tiktok", Platform.tiktok],
    ["alice.nostr", Platform.nostr],
    ["alice.fomo", Platform.fomo],
    ["alice.zora", Platform.zora],
    ["alice.FOMO", Platform.fomo],
    ["alice.lens", Platform.lens],
    ["alice.base", Platform.basenames],
    ["alice.base.eth", Platform.basenames],
    ["alice.linea", Platform.linea],
    ["alice.linea.eth", Platform.linea],
    ["vitalik.eth", Platform.ens],
    ["alice.xyz", Platform.ens],
    ["alice.box", Platform.ens],
    ["alice.arb", Platform.arbitrum],
    ["alice.bnb", Platform.space_id],
    ["alice.sol", Platform.sns],
    ["alice.solana", Platform.sns],
    ["alice.skr", Platform.seekerid],
    ["alice.x", Platform.unstoppableDomains],
    ["alice.crypto", Platform.unstoppableDomains],
    ["alice.bitcoin", Platform.unstoppableDomains],
    ["alice.farcaster", Platform.farcaster],
    ["alice.fcast.id", Platform.farcaster],
    ["alice.farcaster.eth", Platform.farcaster],
    ["Alice.Farcaster.ETH", Platform.farcaster],
    ["alice", Platform.farcaster],
    ["foo/bar", Platform.clusters],
    [ETHEREUM, Platform.ethereum],
    [SOLANA, Platform.solana],
    [BTC, Platform.bitcoin],
    [NEXT_ID, Platform.nextid],
    [`${ETHEREUM}.ethereum`, Platform.ethereum],
    [`${SOLANA}.solana`, Platform.solana],
    [`${SOLANA}.SOLANA`, Platform.solana],
    [`${NEXT_ID}.nextid`, Platform.nextid],
    [`${BTC}.bitcoin`, Platform.bitcoin],
    [`${TON}.ton`, Platform.ton],
    [`${NOSTR}.nostr`, Platform.nostr],
    ["google.com", Platform.ens],
    ["alice.ethereum", Platform.ens],
  ])("detects %s as %s", (identity, platform) => {
    expect(detectPlatform(identity)).toBe(platform);
  });

  it("returns null for empty input", () => {
    expect(detectPlatform("")).toBeNull();
    expect(detectPlatform("   ")).toBeNull();
  });
});

describe("resolveIdentity", () => {
  it.each([
    ["alice.twitter", "twitter,alice"],
    ["alice.GITHUB", "github,alice"],
    ["Alice.discord", "discord,alice"],
    ["discord,Alice", "discord,alice"],
    ["GitHub,Alice", "github,alice"],
    [" ens, vitalik.eth ", "ens,vitalik.eth"],
    ["alice.fomo", "fomo,alice"],
    ["alice.zora", "zora,alice"],
    ["alice.tiktok", "tiktok,alice"],
    ["alice.lens", "lens,alice.lens"],
    ["suji.base", "basenames,suji.base.eth"],
    ["suji.BASE", "basenames,suji.base.eth"],
    ["suji.linea", "linea,suji.linea.eth"],
    ["suji.linea.eth", "linea,suji.linea.eth"],
    ["vitalik.eth", "ens,vitalik.eth"],
    ["alice.box", "ens,alice.box"],
    ["alice.arb", "arbitrum,alice.arb"],
    ["alice.bnb", "space_id,alice.bnb"],
    ["alice.sol", "sns,alice.sol"],
    ["alice.solana", "sns,alice.sol"],
    ["alice.SOLANA", "sns,alice.sol"],
    ["alice.x", "unstoppabledomains,alice.x"],
    ["alice.bitcoin", "unstoppabledomains,alice.bitcoin"],
    ["google.com", "ens,google.com"],
    ["Alice.Farcaster.ETH", "farcaster,alice"],
    ["alice.fcast.id", "farcaster,alice"],
    ["alice", "farcaster,alice"],
    ["farcaster,#123", "farcaster,#123"],
    [ETHEREUM, `ethereum,${ETHEREUM.toLowerCase()}`],
    [`${ETHEREUM}.ETHEREUM`, `ethereum,${ETHEREUM.toLowerCase()}`],
    [SOLANA, `solana,${SOLANA}`],
    [`${SOLANA}.solana`, `solana,${SOLANA}`],
    [`${SOLANA}.SOLANA`, `solana,${SOLANA}`],
    [`${NEXT_ID}.NEXTID`, `nextid,${NEXT_ID}`],
    [NOSTR, `nostr,${NOSTR}`],
    ["alice.nostr", "nostr,alice"],
  ])("resolves %s", (input, expected) => {
    expect(resolveIdentity(input)).toBe(expected);
  });

  it("returns null for invalid or unsupported identities", () => {
    expect(resolveIdentity("")).toBeNull();
    expect(resolveIdentity("   ")).toBeNull();
    expect(resolveIdentity("a,b,c")).toBeNull();
    expect(resolveIdentity(BTC)).toBeNull();
    expect(resolveIdentity(`${BTC}.bitcoin`)).toBeNull();
    expect(resolveIdentity(`${TON}.ton`)).toBeNull();
    expect(resolveIdentity("foo/bar")).toBeNull();
    expect(resolveIdentity("alice.skr")).toBeNull();
    expect(resolveIdentity("unknown,alice")).toBeNull();
  });
});

describe("prettify", () => {
  it("returns empty string for empty input", () => {
    expect(prettify("")).toBe("");
  });

  it.each([
    ["farcaster,#123", "#123"],
    ["alice.farcaster", "alice"],
    ["alice.fcast.id", "alice"],
    ["Alice.Farcaster.ETH", "Alice"],
    [`${SOLANA}.solana`, SOLANA],
    [`${ETHEREUM}.ethereum`, ETHEREUM],
    ["suji.base", "suji.base.eth"],
    ["suji.linea", "suji.linea.eth"],
    ["alice.solana", "alice.sol"],
    ["alice.twitter", "alice"],
    ["alice.fomo", "alice"],
    ["alice.zora", "alice"],
    ["vitalik.eth", "vitalik.eth"],
  ])("prettifies %s", (input, expected) => {
    expect(prettify(input)).toBe(expected);
  });
});

describe("uglify", () => {
  it("returns empty string for empty input", () => {
    expect(uglify("", Platform.farcaster)).toBe("");
  });

  it.each([
    [Platform.farcaster, "alice", "alice.farcaster"],
    [Platform.farcaster, "alice.farcaster", "alice.farcaster"],
    [Platform.farcaster, "Alice.FARCASTER", "Alice.FARCASTER"],
    [Platform.lens, "alice", "alice.lens"],
    [Platform.lens, "Alice.LENS", "Alice.lens"],
    [Platform.basenames, "alice", "alice.base.eth"],
    [Platform.basenames, "Alice.BASE", "Alice.base.eth"],
    [Platform.basenames, "alice.base.eth", "alice.base.eth"],
    [Platform.linea, "alice", "alice.linea.eth"],
    [Platform.linea, "Alice.LINEA", "Alice.linea.eth"],
    [Platform.twitter, "alice", "alice"],
  ])("uglifies %s %s", (platform, input, expected) => {
    expect(uglify(input, platform)).toBe(expected);
  });
});

describe("idToJson", () => {
  it.each([
    ["ens,sujiyan.eth", { platform: Platform.ens, identity: "sujiyan.eth" }],
    ["suji.farcaster", { platform: Platform.farcaster, identity: "suji" }],
    ["suji.base", { platform: Platform.basenames, identity: "suji.base.eth" }],
    ["alice.fomo", { platform: Platform.fomo, identity: "alice" }],
  ])("converts %s", (input, expected) => {
    expect(idToJson(input)).toEqual(expected);
  });

  it("returns null for invalid identities", () => {
    expect(idToJson("")).toBeNull();
    expect(idToJson("a,b,c")).toBeNull();
  });
});

describe("isSupportedPlatform", () => {
  it.each([
    [Platform.ens, true],
    [Platform.fomo, true],
    [Platform.zora, true],
    [Platform.tiktok, true],
    [Platform.solana, true],
    [Platform.bitcoin, false],
    [Platform.ton, false],
    [Platform.clusters, false],
    [Platform.seekerid, false],
    [null, false],
    [undefined, false],
  ])("isSupportedPlatform(%s)", (platform, expected) => {
    expect(isSupportedPlatform(platform)).toBe(expected);
  });
});

describe("address helpers", () => {
  it("detects web3 addresses", () => {
    expect(isWeb3Address(ETHEREUM)).toBe(true);
    expect(isWeb3Address(SOLANA)).toBe(true);
    expect(isWeb3Address(BTC)).toBe(true);
    expect(isWeb3Address(TON)).toBe(true);
    expect(isWeb3Address(NEXT_ID)).toBe(true);
    expect(isWeb3Address(NOSTR)).toBe(true);
    expect(isWeb3Address("")).toBe(false);
    expect(isWeb3Address("alice")).toBe(false);
    expect(isWeb3Address(`${SOLANA}.solana`)).toBe(false);
  });

  it("validates Ethereum addresses and rejects burn addresses", () => {
    expect(isValidEthereumAddress(ETHEREUM)).toBe(true);
    expect(isValidEthereumAddress("not-an-address")).toBe(false);
    expect(isValidEthereumAddress("0x000000000000000000000000000000000000dead")).toBe(
      false,
    );
  });

  it("validates Solana addresses", () => {
    expect(isValidSolanaAddress(SOLANA)).toBe(true);
    expect(isValidSolanaAddress("")).toBe(false);
    expect(isValidSolanaAddress("alice")).toBe(false);
    expect(isValidSolanaAddress(`${SOLANA}.solana`)).toBe(false);
  });

  it("compares addresses case-insensitively", () => {
    expect(isSameAddress(ETHEREUM, ETHEREUM.toUpperCase())).toBe(true);
    expect(isSameAddress(ETHEREUM, SOLANA)).toBe(false);
    expect(isSameAddress(undefined, ETHEREUM)).toBe(false);
    expect(isSameAddress("", "")).toBe(false);
  });
});
