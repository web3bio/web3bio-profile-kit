import { renderHook, waitFor } from "@testing-library/react";
import { useQueryDomain } from "../hooks/useQueryDomain";
const TIMEOUT_LIMIT = 100000;

describe("useQueryDomain - Live API Test", () => {
  test("Domain query for sujiyan.eth", async () => {
    const identity = "sujiyan.eth";
    const { result } = renderHook(() => useQueryDomain(identity));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data.texts.url).toBe("https://mask.io");
    expect(data.addresses.ethereum).toBe(
      "0x7cbba07e31dc7b12bb69a1209c5b11a8ac50acf5",
    );
  });
  test("Domain query for farcaster,dwr", async () => {
    const identity = "farcaster,dwr";
    const { result } = renderHook(() => useQueryDomain(identity));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data.identity).toBe("dwr.eth");
    expect(data.platform).toBe("farcaster");
  });
});
