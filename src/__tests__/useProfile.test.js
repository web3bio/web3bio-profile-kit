import { renderHook, waitFor } from '@testing-library/react';
import { useProfile } from '../hooks/useProfile';
import { QueryEndpoint } from '../utils/constants';
import { useBaseQuery } from '../hooks/useBaseQuery';

// Mock the useBaseQuery hook to avoid actual API calls
jest.mock('../hooks/useBaseQuery');

describe('useProfile', () => {
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
    renderHook(() => useProfile(identity, options, universal));

    // Verify the correct parameters were passed
    expect(useBaseQuery).toHaveBeenCalledWith(
      identity,
      QueryEndpoint.PROFILE,
      options,
      universal
    );
  });

  it('should handle successful data fetching', async () => {
    // Mock profile data
    const mockProfileData = {
      identity: 'vitalik.eth',
      address: '0x123',
      avatar: 'https://example.com/avatar.jpg',
      displayName: 'Vitalik',
    };

    // Mock implementation with successful data
    useBaseQuery.mockReturnValue({
      data: mockProfileData,
      isLoading: false,
      error: null,
    });

    // Execute the hook
    const { result } = renderHook(() => useProfile('vitalik.eth'));

    // Verify the data is returned correctly
    await waitFor(() => {
      expect(result.current.data).toEqual(mockProfileData);
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
    const { result } = renderHook(() => useProfile('invalid-identity'));

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
    renderHook(() => useProfile('vitalik.eth'));

    // Verify defaults were used
    expect(useBaseQuery).toHaveBeenCalledWith(
      'vitalik.eth',
      QueryEndpoint.PROFILE,
      {}, // default empty options
      false // default universal value
    );
  });
});