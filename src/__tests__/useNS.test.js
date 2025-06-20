import { renderHook, waitFor } from "@testing-library/react";
import { useNS, useBaseQuery } from "../hooks";
import { QueryEndpoint } from "../types";

// Mock the useBaseQuery hook to avoid actual API calls
jest.mock("../hooks/useBaseQuery");

describe("useNS", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call useBaseQuery with correct parameters", () => {
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
    renderHook(() => useNS(identity, options));

    // Verify the correct parameters were passed
    expect(useBaseQuery).toHaveBeenCalledWith(
      identity,
      QueryEndpoint.NS,
      false,
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
    };

    // Mock implementation with successful data
    useBaseQuery.mockReturnValue({
      data: mockNSData,
      isLoading: false,
      error: null,
    });

    // Execute the hook
    const { result } = renderHook(() => useNS("vitalik.eth"));

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
    const { result } = renderHook(() => useNS("invalid-identity"));

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
    renderHook(() => useNS("vitalik.eth"));

    // Verify defaults were used
    expect(useBaseQuery).toHaveBeenCalledWith(
      "vitalik.eth",
      QueryEndpoint.NS,
      false, // universal is always false for useNS
      {}, // default empty options
    );
  });
});
