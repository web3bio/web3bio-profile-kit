import { renderHook, waitFor } from "@testing-library/react";
import { useQueryProfile } from "../hooks/useQueryProfile";
const API_KEY = process.env.WEB3BIO_IDENTITY_GRAPH_API_KEY || "";
const TIMEOUT_LIMIT = 100000;

describe("useQueryProfile - Live API Test", () => {
  test("Profile query with platofrm id format", async () => {
    const identity = "ethereum,vitalik.eth";
    const { result } = renderHook(() =>
      useQueryProfile(identity, {
        path: "profile",
        apiKey: API_KEY,
      }),
    );
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data.identity).toBe("vitalik.eth");
  });

  test("NS query with platofrm id format", async () => {
    const identity = "basenames,tony.base.eth";
    const { result } = renderHook(() =>
      useQueryProfile(identity, {
        path: "ns",
        apiKey: API_KEY,
      }),
    );
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data.identity).toBe("tony.base.eth");
    expect(data.link).toBe(undefined);
  });

  test("Profile Query Universal", async () => {
    const identity = "sujiyan.eth";
    const { result } = renderHook(() =>
      useQueryProfile(identity, {
        path: "profile",
        apiKey: API_KEY,
      }),
    );
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data.length).toBe(6);
  });

  test("NS Query Universal", async () => {
    const identity = "stani.lens";
    const { result } = renderHook(() =>
      useQueryProfile(identity, {
        path: "ns",
        apiKey: API_KEY,
      }),
    );
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: TIMEOUT_LIMIT,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();

    const data = result.current.data;
    expect(data.length).toBe(11);
  });

  test("Profile Batch", async () => {
    const identity = [
      "linea,184.linea.eth",
      "ethereum,0x2EC8EBB0a8eAa40e4Ce620CF9f84A96dF68D4669",
      "suji_yan.twitter",
    ];
    const { result } = renderHook(() =>
      useQueryProfile(identity, {
        path: "profile",
        apiKey: API_KEY,
      }),
    );
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
  test("NS Batch", async () => {
    const identity = [
      "ens,sujiyan.eth",
      "ens,nick.eth",
      "basenames,tony.base.eth",
      "farcaster,dwr.eth",
    ];
    const { result } = renderHook(() =>
      useQueryProfile(identity, {
        path: "profile",
        apiKey: API_KEY,
      }),
    );
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
});
