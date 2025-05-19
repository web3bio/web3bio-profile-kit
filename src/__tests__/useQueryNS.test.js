import { renderHook, waitFor } from "@testing-library/react";
import { useQueryNS } from "../hooks/useQueryNS";
const TIMEOUT_LIMIT = 100000;

describe("useQueryNS - Live API Test", () => {
  test("NS query with platofrm id format", async () => {
    const identity = "basenames,tony.base.eth";
    const { result } = renderHook(() => useQueryNS(identity, true));
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data[0].identity).toBe("tony.base.eth");
    expect(data[0].link).toBe(undefined);
  });

  test("NS Query Universal", async () => {
    const identity = "stani.lens";
    const { result } = renderHook(() => useQueryNS(identity, true));
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data.length).toBe(11);
  });

  test("NS Batch", async () => {
    const identity = [
      "ens,sujiyan.eth",
      "ens,nick.eth",
      "basenames,tony.base.eth",
      "farcaster,dwr.eth",
    ];
    const { result } = renderHook(() => useQueryNS(identity));
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data[1].identity).toBe("nick.eth");
    expect(data[3].identity).toBe("dwr.eth");
  });
  test("Invalid api key", async () => {
    const { result } = renderHook(() =>
      useQueryNS("sujiyan.eth", false, {
        apiKey: "invalid_api_key",
      }),
    );
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBe("Invalid API Token");
  });
});
