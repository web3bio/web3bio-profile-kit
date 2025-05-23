import { renderHook, waitFor } from '@testing-library/react';
import { useNameService } from '../hooks/useNameService';
import { QueryEndpoint } from '../utils/constants';
import { useBaseQuery } from '../hooks/useBaseQuery';

// Mock the useBaseQuery hook to avoid actual API calls
jest.mock('../hooks/useBaseQuery');

describe('useNameService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call useBaseQuery with correct parameters', () => {
    // Mock implementation
    useBaseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    // Set up test parameters
    const identity = 'vitalik.eth';
    const options = { apiKey: 'test-key' };
    const universal = true;

    // Execute the hook
    renderHook(() => useNameService(identity, options, universal));

    // Verify the correct parameters were passed
    expect(useBaseQuery).toHaveBeenCalledWith(
      identity,
      QueryEndpoint.NS,
      options,
      universal
    );
  });

  it('should handle successful data fetching', async () => {
    // Mock NS data
    const mockNSData = {
      identity: 'vitalik.eth',
      address: '0x123',
      avatar: 'https://example.com/avatar.jpg',
      displayName: 'Vitalik',
    };

    // Mock implementation with successful data
    useBaseQuery.mockReturnValue({
      data: mockNSData,
      isLoading: false,
      error: null,
    });

    // Execute the hook
    const { result } = renderHook(() => useNameService('vitalik.eth'));

    // Verify the data is returned correctly
    await waitFor(() => {
      expect(result.current.data).toEqual(mockNSData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle errors', async () => {
    // Mock error
    const mockError = new Error('API Error');

    // Mock implementation with error
    useBaseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError,
    });

    // Execute the hook
    const { result } = renderHook(() => useNameService('invalid-identity'));

    // Verify the error is handled correctly
    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(mockError);
    });
  });

  it('should use default values for options and universal', () => {
    // Mock implementation
    useBaseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    // Execute the hook without optional parameters
    renderHook(() => useNameService('vitalik.eth'));

    // Verify defaults were used
    expect(useBaseQuery).toHaveBeenCalledWith(
      'vitalik.eth',
      QueryEndpoint.NS,
      {}, // default empty options
      false // default universal value
    );
  });
});