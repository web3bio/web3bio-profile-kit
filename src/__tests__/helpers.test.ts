import { Platform } from "../types";
import {
  detectPlatform,
  isSupportedPlatform,
  resolveIdentity,
} from "../utils/helpers";

describe("detectPlatform", () => {
  it.each([
    ["alice.twitter", Platform.twitter],
    ["alice.x", Platform.unstoppableDomains],
    ["alice.github", Platform.github],
    ["alice.fomo", Platform.fomo],
    ["alice.GITHUB", Platform.github],
  ])("detects %s as %s", (identity, platform) => {
    expect(detectPlatform(identity)).toBe(platform);
  });

  it.each([
    ["vitalik.eth", Platform.ens],
    ["alice.arb", Platform.arbitrum],
    ["alice.bnb", Platform.space_id],
    ["alice.farcaster.eth", Platform.farcaster],
    ["alice", Platform.farcaster],
  ])("keeps detecting %s as %s", (identity, platform) => {
    expect(detectPlatform(identity)).toBe(platform);
  });
});

describe("Fomo platform", () => {
  it("is supported as a Web3 identity platform", () => {
    expect(isSupportedPlatform(Platform.fomo)).toBe(true);
    expect(resolveIdentity("alice.fomo")).toBe("fomo,alice.fomo");
  });
});
