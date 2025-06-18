import { renderHook, waitFor } from "@testing-library/react";
import { useBaseQuery } from "../hooks";
import { ErrorMessages, QueryEndpoint } from "../types";
import {
  PROD_API_ENDPOINT,
  getApiKey,
  resolveIdentity,
} from "../utils/helpers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the fetch API
global.fetch = jest.fn();

// Mock helper functions
jest.mock("../utils/helpers", () => ({
  PROD_API_ENDPOINT: "https://api.web3.bio",
  getApiKey: jest.fn(),
  resolveIdentity: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useBaseQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    getApiKey.mockImplementation((key) => key || "default-key");
    resolveIdentity.mockImplementation((id) =>
      id.includes(",") ? id : `platform,${id}`,
    );

    // Default fetch mock
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    );
  });

  it("should construct the correct URL for single identity", async () => {
    // Setup
    const mockData = { result: "success" };
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    resolveIdentity.mockReturnValue("ens,vitalik.eth");

    // Execute hook with wrapper
    const { result } = renderHook(
      () => useBaseQuery("vitalik.eth", QueryEndpoint.PROFILE, false),
      { wrapper: createWrapper() },
    );

    // Wait for fetch to be called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Verify URL construction
    expect(global.fetch).toHaveBeenCalledWith(
      `${PROD_API_ENDPOINT}/${QueryEndpoint.PROFILE}/ens/vitalik.eth`,
      {
        headers: {
          "x-api-key": "default-key",
        },
        method: "GET",
      },
    );
    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify data
    expect(result.current.data).toEqual(mockData);
  });

  it("should construct batch URL for array of identities", async () => {
    // Setup
    const identities = ["vitalik.eth", "lens,stani"];
    const mockData = { result: "batch success" };

    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    // Execute hook with wrapper
    const { result } = renderHook(
      () => useBaseQuery(identities, QueryEndpoint.PROFILE, false),
      { wrapper: createWrapper() },
    );

    // Wait for fetch to be called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Verify URL construction for batch request
    expect(global.fetch).toHaveBeenCalledWith(
      `${PROD_API_ENDPOINT}/${QueryEndpoint.PROFILE}/batch/${encodeURIComponent(JSON.stringify(identities))}`,
      {
        headers: {
          "x-api-key": "default-key",
        },
        method: "GET",
      },
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should use universal URL format when universal=true", async () => {
    // Setup
    const identity = "vitalik.eth";
    const mockData = { result: "universal success" };

    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    // Execute hook with universal=true and wrapper
    const { result } = renderHook(
      () => useBaseQuery(identity, QueryEndpoint.PROFILE, true),
      { wrapper: createWrapper() },
    );

    // Wait for fetch to be called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Verify universal URL format
    expect(global.fetch).toHaveBeenCalledWith(
      `${PROD_API_ENDPOINT}/${QueryEndpoint.PROFILE}/${identity}`,
      {
        headers: {
          "x-api-key": "default-key",
        },
        method: "GET",
      },
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should include API key in request headers when provided", async () => {
    // Setup
    const apiKey = "test-api-key";
    const mockData = { result: "api key success" };

    getApiKey.mockReturnValue(apiKey);

    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    // Execute hook with API key and wrapper
    const { result } = renderHook(
      () =>
        useBaseQuery("184.liena.eth", QueryEndpoint.PROFILE, false, { apiKey }),
      { wrapper: createWrapper() },
    );

    // Wait for fetch to be called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Verify API key in headers
    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
      headers: {
        "x-api-key": apiKey,
      },
      method: "GET",
    });

    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should not execute query when enabled=false", async () => {
    // Execute hook with enabled=false and wrapper
    renderHook(
      () =>
        useBaseQuery("vitalik.eth", QueryEndpoint.PROFILE, false, {
          enabled: false,
        }),
      { wrapper: createWrapper() },
    );

    // Pause briefly to allow any potential async operations
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Verify fetch was not called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should set error when URL construction fails", async () => {
    global.fetch.mockImplementation(() => {
      throw new Error(ErrorMessages.INVALID_IDENTITY);
    });

    const { result } = renderHook(
      () => useBaseQuery("invalid", QueryEndpoint.PROFILE, false, { retry: 0 }),
      { wrapper: createWrapper() },
    );
    // Wait for fetch to be called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toBe(ErrorMessages.INVALID_IDENTITY);
  });

  it("should handle API error responses", async () => {
    // Setup
    const errorMessage = "API error message";

    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject(new Error(errorMessage)),
      }),
    );

    // Execute hook with wrapper
    const { result } = renderHook(
      () => useBaseQuery("dwr.eth", QueryEndpoint.PROFILE, false, { retry: 0 }),
      { wrapper: createWrapper() },
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify error handling
    expect(result.current.error).toEqual(new Error(errorMessage));
    expect(result.current.data).toBeNull();
  });

  it("should handle network errors", async () => {
    // Setup
    const networkError = new Error("Network failure");

    global.fetch.mockImplementation(() => Promise.reject(networkError));

    // Execute hook with wrapper
    const { result } = renderHook(
      () =>
        useBaseQuery("nick.eth", QueryEndpoint.PROFILE, false, { retry: 0 }),
      { wrapper: createWrapper() },
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify network error handling
    expect(result.current.error).toEqual(networkError);
    expect(result.current.data).toBeNull();
  });

  it("should handle HTTP error responses", async () => {
    // Setup
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      }),
    );

    // Execute hook with wrapper
    const { result } = renderHook(
      () =>
        useBaseQuery("pugson.eth", QueryEndpoint.PROFILE, false, { retry: 0 }),
      { wrapper: createWrapper() },
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify HTTP error handling
    expect(result.current.error).toEqual(new Error("API error: 404"));
    expect(result.current.data).toBeNull();
  });

  it("should use cached data when available", async () => {
    // Setup
    const mockData = { result: "cached data" };
    const wrapper = createWrapper();

    // Setup for first render
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    // First render to populate cache
    const { result: firstResult, unmount: firstUnmount } = renderHook(
      () => useBaseQuery("ted.farcaster", QueryEndpoint.PROFILE, false),
      { wrapper },
    );

    // Wait for first request to complete
    await waitFor(() => {
      expect(firstResult.current.isLoading).toBe(false);
      expect(firstResult.current.data).toEqual(mockData);
    });

    // Reset fetch mock
    global.fetch.mockClear();

    // Unmount first hook
    firstUnmount();

    // Second render should use cached data
    const { result: secondResult } = renderHook(
      () => useBaseQuery("ted.farcaster", QueryEndpoint.PROFILE, false),
      { wrapper },
    );

    // Verify data is available from cache
    await waitFor(() => {
      expect(secondResult.current.data).toEqual(mockData);
    });

    // Verify no new fetch was made (or only one was made)
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should not fetch again when parameters haven't changed", async () => {
    // Setup
    const mockData = { result: "test data" };
    const wrapper = createWrapper();

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    // Initial render
    const { result, rerender } = renderHook(
      (props) => useBaseQuery(props.identity, props.endpoint, props.universal),
      {
        initialProps: {
          identity: "web3.bio",
          endpoint: QueryEndpoint.PROFILE,
          universal: false,
        },
        wrapper,
      },
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockData);
    });

    // Clear fetch mock
    global.fetch.mockClear();

    // Rerender with same props
    rerender({
      identity: "web3.bio",
      endpoint: QueryEndpoint.PROFILE,
      universal: false,
    });

    // Allow time for any potential fetches
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Verify no additional fetch was made
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should fetch new data when parameters change", async () => {
    // Setup
    const firstMockData = { result: "first data" };
    const secondMockData = { result: "second data" };
    const wrapper = createWrapper();

    // First, set up fetch to return firstMockData
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(firstMockData),
      }),
    );

    // Then set up fetch to return secondMockData on second call
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(secondMockData),
      }),
    );

    // Initial render
    const { result, rerender } = renderHook(
      (props) => useBaseQuery(props.identity, props.endpoint, props.universal),
      {
        initialProps: {
          identity: "wijuwiju.eth",
          endpoint: QueryEndpoint.PROFILE,
          universal: false,
        },
        wrapper,
      },
    );

    // Wait for first render to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(firstMockData);
    });

    // Rerender with different props
    rerender({
      identity: "different.eth",
      endpoint: QueryEndpoint.PROFILE,
      universal: false,
    });

    // Wait for second fetch to complete
    await waitFor(() => {
      expect(result.current.data).toEqual(secondMockData);
    });

    // Verify fetch was called twice (once for each identity)
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
