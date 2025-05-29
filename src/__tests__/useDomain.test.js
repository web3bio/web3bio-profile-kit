import { renderHook, waitFor } from "@testing-library/react";
import { useDomain, useBaseQuery } from "../hooks";
import { QueryEndpoint } from "../types";

// Mock the useBaseQuery hook to avoid actual API calls
jest.mock("../hooks/useBaseQuery");

describe("useDomain", () => {
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
    renderHook(() => useDomain(identity, options));

    // Verify the correct parameters were passed
    expect(useBaseQuery).toHaveBeenCalledWith(
      identity,
      QueryEndpoint.DOMAIN,
      false,
      options,
    );
  });

  it("should handle successful data fetching", async () => {
    // Mock domain data
    const mockDomainData = {
      identity: "vitalik.eth",
      platform: "ens",
      resolvedAddress: "0x123",
      ownerAddress: "0x456",
      managerAddress: "0x789",
      displayName: "Vitalik",
      isPrimary: true,
      status: "active",
      texts: {
        email: "test@example.com",
        url: "https://example.com",
      },
      addresses: {
        ETH: "0x123",
      },
    };

    // Mock implementation with successful data
    useBaseQuery.mockReturnValue({
      data: mockDomainData,
      isLoading: false,
      error: null,
    });

    // Execute the hook
    const { result } = renderHook(() => useDomain("vitalik.eth"));

    // Verify the data is returned correctly
    await waitFor(() => {
      expect(result.current.data).toEqual(mockDomainData);
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
    const { result } = renderHook(() => useDomain("invalid-identity"));

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
    renderHook(() => useDomain("vitalik.eth"));

    // Verify defaults were used
    expect(useBaseQuery).toHaveBeenCalledWith(
      "vitalik.eth",
      QueryEndpoint.DOMAIN,
      false, // universal is always false for useDomain
      {}, // default empty options
    );
  });
});
