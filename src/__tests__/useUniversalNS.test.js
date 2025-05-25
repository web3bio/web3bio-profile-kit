import { renderHook, waitFor } from "@testing-library/react";
import { useUniversalNS } from "../hooks/useUniversalNS";
import { QueryEndpoint } from "../utils/constants";
import { useBaseQuery } from "../hooks/useBaseQuery";

// Mock the useBaseQuery hook to avoid actual API calls
jest.mock("../hooks/useBaseQuery");

describe("useUniversalNS", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call useBaseQuery with correct parameters and universal set to true", () => {
    // Mock implementation
    useBaseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    // Set up test parameters
    const identity = "vitalik.eth";
    const options = { apiKey: "test-key" };

    // Execute the hook
    renderHook(() => useUniversalNS(identity, options));

    // Verify the correct parameters were passed with universal = true
    expect(useBaseQuery).toHaveBeenCalledWith(
      identity,
      QueryEndpoint.NS,
      true,
      options,
    );
  });

  it("should handle successful data fetching", async () => {
    // Mock NS data
    const mockNSData = {
      identity: "vitalik.eth",
      address: "0x123",
      avatar: "https://example.com/avatar.jpg",
      displayName: "Vitalik",
      platform: "ens",
      description: "Ethereum co-founder",
    };

    // Mock implementation with successful data
    useBaseQuery.mockReturnValue({
      data: mockNSData,
      isLoading: false,
      error: null,
    });

    // Execute the hook
    const { result } = renderHook(() => useUniversalNS("vitalik.eth"));

    // Verify the data is returned correctly
    await waitFor(() => {
      expect(result.current.data).toEqual(mockNSData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("should handle errors", async () => {
    // Mock error
    const mockError = new Error("API Error");

    // Mock implementation with error
    useBaseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError,
    });

    // Execute the hook
    const { result } = renderHook(() => useUniversalNS("invalid-identity"));

    // Verify the error is handled correctly
    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(mockError);
    });
  });

  it("should use default values for options", () => {
    // Mock implementation
    useBaseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    // Execute the hook without optional parameters
    renderHook(() => useUniversalNS("dwr.farcaster"));

    // Verify defaults were used
    expect(useBaseQuery).toHaveBeenCalledWith(
      "dwr.farcaster",
      QueryEndpoint.NS,
      true, // universal is always true for useUniversalNS
      {}, // default empty options
    );
  });

  it("should work with different identity formats", () => {
    // Mock implementation
    useBaseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    // Test with various identity formats
    const identities = [
      "vitalik.eth",
      "dwr.farcaster",
      "0x123456789",
      "test.lens",
      "example.bit",
    ];

    identities.forEach((identity) => {
      renderHook(() => useUniversalNS(identity));

      expect(useBaseQuery).toHaveBeenCalledWith(
        identity,
        QueryEndpoint.NS,
        true,
        {},
      );
    });
  });
});
