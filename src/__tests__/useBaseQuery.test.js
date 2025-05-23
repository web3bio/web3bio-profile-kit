import { renderHook, waitFor } from '@testing-library/react';
import { useBaseQuery } from '../hooks/useBaseQuery';
import { API_ENDPOINT, ErrorMessages, QueryEndpoint } from '../utils/constants';
import { getApiKey, resolveIdentity } from '../utils/helpers';

// Mock the fetch API
global.fetch = jest.fn();

// Mock helper functions
jest.mock('../utils/helpers', () => ({
  getApiKey: jest.fn(),
  resolveIdentity: jest.fn(),
}));

describe('useBaseQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    getApiKey.mockImplementation((key) => key || 'default-key');
    resolveIdentity.mockImplementation((id) => id.includes(',') ? id : `platform,${id}`);
    
    // Default fetch mock
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });
  });

  it('should construct the correct URL for single identity', async () => {
    // Setup
    const mockData = { result: 'success' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });
    
    resolveIdentity.mockReturnValueOnce('ens,vitalik.eth');

    // Execute hook
    renderHook(() => useBaseQuery('vitalik.eth', QueryEndpoint.PROFILE));
    
    // Verify URL construction
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_ENDPOINT}/${QueryEndpoint.PROFILE}/ens/vitalik.eth`,
        expect.any(Object)
      );
    });
  });

  it('should construct batch URL for array of identities', async () => {
    // Setup
    const identities = ['vitalik.eth', 'lens,stani'];
    
    // Execute hook
    renderHook(() => useBaseQuery(identities, QueryEndpoint.PROFILE));
    
    // Verify URL construction for batch request
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_ENDPOINT}/${QueryEndpoint.PROFILE}/batch/${JSON.stringify(identities)}`,
        expect.any(Object)
      );
    });
  });

  it('should use universal URL format when universal=true', async () => {
    // Setup
    const identity = 'vitalik.eth';
    
    // Execute hook with universal=true
    renderHook(() => useBaseQuery(identity, QueryEndpoint.PROFILE, {}, true));
    
    // Verify universal URL format
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_ENDPOINT}/${QueryEndpoint.PROFILE}/${identity}`,
        expect.any(Object)
      );
    });
  });

  it('should include API key in request headers when provided', async () => {
    // Setup
    const apiKey = 'test-api-key';
    getApiKey.mockReturnValueOnce(apiKey);
    
    // Execute hook with API key
    renderHook(() => useBaseQuery('vitalik.eth', QueryEndpoint.PROFILE, { apiKey }));
    
    // Verify API key in headers
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: { 'x-api-key': apiKey }
        })
      );
    });
  });

  it('should not execute query when enabled=false', async () => {
    // Execute hook with enabled=false
    renderHook(() => useBaseQuery('vitalik.eth', QueryEndpoint.PROFILE, { enabled: false }));
    
    // Verify fetch was not called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should set error when URL construction fails', async () => {
    // Setup
    resolveIdentity.mockReturnValueOnce(null);
    
    // Execute hook
    const { result } = renderHook(() => useBaseQuery('invalid', QueryEndpoint.PROFILE));
    
    // Verify error is set
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error(ErrorMessages.INVALID_IDENTITY));
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeNull();
    });
  });

  it('should handle API error responses', async () => {
    // Setup
    const errorMessage = 'API error message';
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ error: errorMessage }),
    });
    
    // Execute hook
    const { result } = renderHook(() => useBaseQuery('vitalik.eth', QueryEndpoint.PROFILE));
    
    // Verify error handling
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error(errorMessage));
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeNull();
    });
  });

  it('should handle network errors', async () => {
    // Setup
    const networkError = new Error('Network failure');
    global.fetch.mockRejectedValueOnce(networkError);
    
    // Execute hook
    const { result } = renderHook(() => useBaseQuery('vitalik.eth', QueryEndpoint.PROFILE));
    
    // Verify network error handling
    await waitFor(() => {
      expect(result.current.error).toEqual(networkError);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeNull();
    });
  });

  it('should handle HTTP error responses', async () => {
    // Setup
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });
    
    // Execute hook
    const { result } = renderHook(() => useBaseQuery('vitalik.eth', QueryEndpoint.PROFILE));
    
    // Verify HTTP error handling
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error('API error: 404'));
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeNull();
    });
  });

  it('should abort fetch when component unmounts', async () => {
    // Setup
    const abortSpy = jest.fn();
    const mockAbortController = {
      signal: 'test-signal',
      abort: abortSpy,
    };
    global.AbortController = jest.fn(() => mockAbortController);
    
    // Execute hook and unmount
    const { unmount } = renderHook(() => useBaseQuery('vitalik.eth', QueryEndpoint.PROFILE));
    unmount();
    
    // Verify abort was called
    expect(abortSpy).toHaveBeenCalledTimes(1);
  });
});