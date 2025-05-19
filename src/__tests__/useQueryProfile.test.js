import { renderHook, waitFor } from "@testing-library/react";
import { useQueryProfile } from "../hooks/useQueryProfile";
const TIMEOUT_LIMIT = 100000;

describe("useQueryProfile - Live API Test", () => {
  test("Profile query with platofrm id format", async () => {
    const identity = "ens,vitalik.eth";
    const { result } = renderHook(() => useQueryProfile(identity, true));
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;

    expect(data[0].identity).toBe("vitalik.eth");
  });

  test("Profile Query Universal", async () => {
    const identity = "sujiyan.eth";
    const { result } = renderHook(() => useQueryProfile(identity, true));
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data.length).toBe(6);
  });

  test("Profile Query Single Platform", async () => {
    const identity = "sujiyan.eth";
    const { result } = renderHook(() => useQueryProfile(identity, false));
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data.identity).toBe("sujiyan.eth");
  });

  test("Profile Batch", async () => {
    const identity = [
      "linea,184.linea.eth",
      "ethereum,0x2EC8EBB0a8eAa40e4Ce620CF9f84A96dF68D4669",
      "suji_yan.twitter",
    ];
    const { result } = renderHook(() => useQueryProfile(identity));
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data[0].identity).toBe("184.linea.eth");
    expect(data[2].identity).toBe("sujiyan.eth");
  });
  test("Invalid api key", async () => {
    const { result } = renderHook(() =>
      useQueryProfile("sujiyan.eth", {
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
