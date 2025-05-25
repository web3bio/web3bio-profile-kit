import { renderHook, waitFor } from '@testing-library/react';
import { useUniversalProfile } from '../hooks/useUniversalProfile';
import { QueryEndpoint } from '../utils/constants';
import { useBaseQuery } from '../hooks/useBaseQuery';

// Mock the useBaseQuery hook to avoid actual API calls
jest.mock('../hooks/useBaseQuery');

describe('useUniversalProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call useBaseQuery with correct parameters and universal set to true', () => {
    // Mock implementation
    useBaseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    // Set up test parameters
    const identity = 'vitalik.eth';
    const options = { apiKey: 'test-key' };

    // Execute the hook
    renderHook(() => useUniversalProfile(identity, options));

    // Verify the correct parameters were passed with universal = true
    expect(useBaseQuery).toHaveBeenCalledWith(
      identity,
      QueryEndpoint.PROFILE,
      true,
      options
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
    const { result } = renderHook(() => useUniversalProfile('vitalik.eth'));

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
    const { result } = renderHook(() => useUniversalProfile('invalid-identity'));

    // Verify the error is handled correctly
    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(mockError);
    });
  });

  it('should use default values for options', () => {
    // Mock implementation
    useBaseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    // Execute the hook without optional parameters
    renderHook(() => useUniversalProfile('dwr.farcaster'));

    // Verify defaults were used
    expect(useBaseQuery).toHaveBeenCalledWith(
      'dwr.farcaster',
      QueryEndpoint.PROFILE,
      true, // universal is always true for useUniversalProfile
      {} // default empty options
    );
  });

  it('should work with different identity formats', () => {
    // Mock implementation
    useBaseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    // Test with various identity formats
    const identities = [
      'vitalik.eth',
      'dwr.farcaster',
      '0x123456789',
      'test.lens'
    ];

    identities.forEach(identity => {
      renderHook(() => useUniversalProfile(identity));
      
      expect(useBaseQuery).toHaveBeenCalledWith(
        identity,
        QueryEndpoint.PROFILE,
        true,
        {}
      );
    });
  });
});