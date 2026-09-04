import { Platform } from "../types";
import {
  detectPlatform,
  isSupportedPlatform,
  resolveIdentity,
  uglify,
} from "../utils/helpers";

describe("detectPlatform", () => {
  it.each([
    ["alice.twitter", Platform.twitter],
    ["alice.x", Platform.unstoppableDomains],
    ["alice.github", Platform.github],
    ["alice.fomo", Platform.fomo],
    ["alice.GITHUB", Platform.github],
    ["alice.lens", Platform.lens],
    ["alice.base", Platform.basenames],
  ])("detects %s as %s", (identity, platform) => {
    expect(detectPlatform(identity)).toBe(platform);
  });

  it.each([
    ["vitalik.eth", Platform.ens],
    ["alice.arb", Platform.arbitrum],
    ["alice.bnb", Platform.space_id],
    ["alice.farcaster.eth", Platform.farcaster],
    ["Alice.Farcaster.ETH", Platform.farcaster],
    ["alice", Platform.farcaster],
  ])("keeps detecting %s as %s", (identity, platform) => {
    expect(detectPlatform(identity)).toBe(platform);
  });

  it.each([
    ["alice.box", Platform.ens],
    ["alice.bitcoin", Platform.unstoppableDomains],
    ["google.com", Platform.ens],
  ])("does not treat name-service TLD %s as a platform key", (identity, platform) => {
    expect(detectPlatform(identity)).toBe(platform);
  });
});

describe("resolveIdentity", () => {
  it("keeps ENS .box names queryable", () => {
    expect(resolveIdentity("alice.box")).toBe("ens,alice.box");
  });

  it("strips web2 suffixes case-insensitively", () => {
    expect(resolveIdentity("alice.GITHUB")).toBe("github,alice");
  });

  it("lowercases Discord identities", () => {
    expect(resolveIdentity("Alice.discord")).toBe("discord,alice");
    expect(resolveIdentity("discord,Alice")).toBe("discord,alice");
  });

  it("strips Farcaster suffixes case-insensitively", () => {
    expect(resolveIdentity("Alice.Farcaster.ETH")).toBe("farcaster,alice");
  });

  it("normalizes comma-form platform names", () => {
    expect(resolveIdentity("GitHub,Alice")).toBe("github,alice");
    expect(resolveIdentity(" ens, vitalik.eth ")).toBe("ens,vitalik.eth");
  });

  it("resolves supported name-service TLDs", () => {
    expect(resolveIdentity("alice.arb")).toBe("arbitrum,alice.arb");
    expect(resolveIdentity("alice.bnb")).toBe("space_id,alice.bnb");
  });

  it("falls unknown dotted names back to ENS", () => {
    expect(resolveIdentity("google.com")).toBe("ens,google.com");
  });

  it("treats .solana as a Solana address suffix", () => {
    const address = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";
    expect(detectPlatform(`${address}.solana`)).toBe(Platform.solana);
    expect(detectPlatform(`${address}.SOLANA`)).toBe(Platform.solana);
    expect(resolveIdentity(`${address}.solana`)).toBe(`solana,${address}`);
    expect(resolveIdentity(`${address}.SOLANA`)).toBe(`solana,${address}`);
  });
});

describe("uglify", () => {
  it("canonicalizes suffixes case-insensitively", () => {
    expect(uglify("Alice.BASE", Platform.basenames)).toBe("Alice.base.eth");
    expect(uglify("Alice.LENS", Platform.lens)).toBe("Alice.lens");
    expect(uglify("Alice.LINEA", Platform.linea)).toBe("Alice.linea.eth");
    expect(uglify("Alice.FARCASTER", Platform.farcaster)).toBe(
      "Alice.FARCASTER",
    );
  });
});

describe("Fomo platform", () => {
  it("is supported as a Web3 identity platform", () => {
    expect(isSupportedPlatform(Platform.fomo)).toBe(true);
    expect(resolveIdentity("alice.fomo")).toBe("fomo,alice.fomo");
  });
});
