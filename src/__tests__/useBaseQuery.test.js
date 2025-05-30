import { renderHook, waitFor } from "@testing-library/react";
import { useBaseQuery } from "../hooks";
import { ErrorMessages, QueryEndpoint } from "../types";
import {
  PROD_API_ENDPOINT,
  getApiKey,
  resolveIdentity,
} from "../utils/helpers";

// Mock the fetch API
global.fetch = jest.fn();

// Mock helper functions
jest.mock("../utils/helpers", () => ({
  getApiKey: jest.fn(),
  resolveIdentity: jest.fn(),
}));

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

    // Execute hook
    const { result } = renderHook(() =>
      useBaseQuery("vitalik.eth", QueryEndpoint.PROFILE, false),
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

    // Execute hook
    const { result } = renderHook(() =>
      useBaseQuery(identities, QueryEndpoint.PROFILE, false),
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

    // Execute hook with universal=true
    const { result } = renderHook(() =>
      useBaseQuery(identity, QueryEndpoint.PROFILE, true),
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

    // Execute hook with API key
    const { result } = renderHook(() =>
      useBaseQuery("184.liena.eth", QueryEndpoint.PROFILE, false, { apiKey }),
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
    // Execute hook with enabled=false
    renderHook(() =>
      useBaseQuery("vitalik.eth", QueryEndpoint.PROFILE, false, {
        enabled: false,
      }),
    );

    // Pause briefly to allow any potential async operations
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Verify fetch was not called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should set error when URL construction fails", async () => {
    // Setup
    resolveIdentity.mockReturnValue(null);

    // Execute hook
    const { result } = renderHook(() =>
      useBaseQuery("invalid", QueryEndpoint.PROFILE, false),
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify error is set
    expect(result.current.error).toEqual(
      new Error(ErrorMessages.INVALID_IDENTITY),
    );
    expect(result.current.data).toBeNull();
  });

  it("should handle API error responses", async () => {
    // Setup
    const errorMessage = "API error message";

    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ error: errorMessage }),
      }),
    );

    // Execute hook
    const { result } = renderHook(() =>
      useBaseQuery("dwr.eth", QueryEndpoint.PROFILE, false),
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

    // Execute hook
    const { result } = renderHook(() =>
      useBaseQuery("nick.eth", QueryEndpoint.PROFILE, false),
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

    // Execute hook
    const { result } = renderHook(() =>
      useBaseQuery("pugson.eth", QueryEndpoint.PROFILE, false),
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

    // Setup for first render
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    // First render to populate cache
    const { result: firstResult } = renderHook(() =>
      useBaseQuery("ted.farcaster", QueryEndpoint.PROFILE, false),
    );

    // Wait for first request to complete
    await waitFor(() => {
      expect(firstResult.current.isLoading).toBe(false);
      expect(firstResult.current.data).toEqual(mockData);
    });

    // Reset fetch mock
    global.fetch.mockClear();

    // Second render should use cached data
    const { result: secondResult } = renderHook(() =>
      useBaseQuery("ted.farcaster", QueryEndpoint.PROFILE, false),
    );

    // Verify data is immediately available from cache
    expect(secondResult.current.data).toEqual(mockData);

    // Verify no new fetch was made
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should not fetch again when parameters haven't changed", async () => {
    // Setup
    const mockData = { result: "test data" };

    global.fetch.mockImplementation(() =>
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
    // Setup for first render
    const firstMockData = { result: "first data" };
    const secondMockData = { result: "second data" };

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
