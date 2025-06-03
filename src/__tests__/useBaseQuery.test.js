import { renderHook, waitFor, act } from "@testing-library/react";
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

// 增加更长的超时时间用于测试
const WAIT_OPTIONS = { timeout: 3000 };

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
        staleTime: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// 辅助函数：等待所有微任务完成
const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("useBaseQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    getApiKey.mockImplementation((key) => key || "default-key");
    resolveIdentity.mockImplementation((id) =>
      id.includes(",") ? id : `platform,${id}`,
    );

    // Default fetch mock - 确保所有 Promise 完全解析
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
    let result;
    await act(async () => {
      const rendered = renderHook(
        () => useBaseQuery("vitalik.eth", QueryEndpoint.PROFILE, false),
        { wrapper: createWrapper() },
      );
      result = rendered.result;

      // 等待异步操作完成
      await flushPromises();
    });

    // 检查初始状态
    console.log("Initial state:", result.current);

    // 等待 fetch 被调用
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    }, WAIT_OPTIONS);

    // 验证 URL 构造
    expect(global.fetch).toHaveBeenCalledWith(
      `${PROD_API_ENDPOINT}/${QueryEndpoint.PROFILE}/ens/vitalik.eth`,
      {
        headers: {
          "x-api-key": "default-key",
        },
        method: "GET",
      },
    );

    // 等待加载完成
    await waitFor(() => {
      console.log("Current state:", result.current);
      // 使用状态变量和数据检查替代直接检查 isLoading
      expect(
        result.current.status === "success" || !result.current.isLoading,
      ).toBeTruthy();
    }, WAIT_OPTIONS);

    // 验证数据
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
    let result;
    await act(async () => {
      const rendered = renderHook(
        () => useBaseQuery(identities, QueryEndpoint.PROFILE, false),
        { wrapper: createWrapper() },
      );
      result = rendered.result;
      await flushPromises();
    });

    // 等待 fetch 被调用
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    }, WAIT_OPTIONS);

    // 验证批量请求的 URL 构造
    expect(global.fetch).toHaveBeenCalledWith(
      `${PROD_API_ENDPOINT}/${QueryEndpoint.PROFILE}/batch/${encodeURIComponent(JSON.stringify(identities))}`,
      {
        headers: {
          "x-api-key": "default-key",
        },
        method: "GET",
      },
    );

    // 等待加载完成 - 改为检查数据而不是加载状态
    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    }, WAIT_OPTIONS);
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
    let result;
    await act(async () => {
      const rendered = renderHook(
        () => useBaseQuery(identity, QueryEndpoint.PROFILE, true),
        { wrapper: createWrapper() },
      );
      result = rendered.result;
      await flushPromises();
    });

    // 等待 fetch 被调用
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    }, WAIT_OPTIONS);

    // 验证通用 URL 格式
    expect(global.fetch).toHaveBeenCalledWith(
      `${PROD_API_ENDPOINT}/${QueryEndpoint.PROFILE}/${identity}`,
      {
        headers: {
          "x-api-key": "default-key",
        },
        method: "GET",
      },
    );

    // 等待加载完成
    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    }, WAIT_OPTIONS);
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
    let result;
    await act(async () => {
      const rendered = renderHook(
        () =>
          useBaseQuery("184.liena.eth", QueryEndpoint.PROFILE, false, {
            apiKey,
          }),
        { wrapper: createWrapper() },
      );
      result = rendered.result;
      await flushPromises();
    });

    // 等待 fetch 被调用
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    }, WAIT_OPTIONS);

    // 验证 API key 在 headers 中
    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
      headers: {
        "x-api-key": apiKey,
      },
      method: "GET",
    });

    // 等待加载完成 - 检查数据而不是加载状态
    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    }, WAIT_OPTIONS);
  });

  it("should not execute query when enabled=false", async () => {
    // Execute hook with enabled=false and wrapper
    await act(async () => {
      renderHook(
        () =>
          useBaseQuery("vitalik.eth", QueryEndpoint.PROFILE, false, {
            enabled: false,
          }),
        { wrapper: createWrapper() },
      );
      await flushPromises();
    });

    // 验证 fetch 未被调用
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should set error when URL construction fails", async () => {
    // Setup
    resolveIdentity.mockReturnValue(null);

    // Execute hook with wrapper
    let result;
    await act(async () => {
      const rendered = renderHook(
        () => useBaseQuery("invalid", QueryEndpoint.PROFILE, false),
        { wrapper: createWrapper() },
      );
      result = rendered.result;
      await flushPromises();
    });

    // 等待查询完成
    await waitFor(() => {
      expect(result.current.status).toBe("error");
    }, WAIT_OPTIONS);

    // 验证错误被设置
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

    // Execute hook with wrapper
    let result;
    await act(async () => {
      const rendered = renderHook(
        () => useBaseQuery("dwr.eth", QueryEndpoint.PROFILE, false),
        { wrapper: createWrapper() },
      );
      result = rendered.result;
      await flushPromises();
    });

    // 等待查询完成
    await waitFor(() => {
      expect(result.current.status).toBe("error");
    }, WAIT_OPTIONS);

    // 验证错误处理
    expect(result.current.error).toEqual(new Error(errorMessage));
    expect(result.current.data).toBeNull();
  });

  it("should handle network errors", async () => {
    // Setup
    const networkError = new Error("Network failure");

    global.fetch.mockImplementation(() => Promise.reject(networkError));

    // Execute hook with wrapper
    let result;
    await act(async () => {
      const rendered = renderHook(
        () => useBaseQuery("nick.eth", QueryEndpoint.PROFILE, false),
        { wrapper: createWrapper() },
      );
      result = rendered.result;
      await flushPromises();
    });

    // 等待查询完成
    await waitFor(() => {
      expect(result.current.status).toBe("error");
    }, WAIT_OPTIONS);

    // 验证网络错误处理
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
    let result;
    await act(async () => {
      const rendered = renderHook(
        () => useBaseQuery("pugson.eth", QueryEndpoint.PROFILE, false),
        { wrapper: createWrapper() },
      );
      result = rendered.result;
      await flushPromises();
    });

    // 等待查询完成
    await waitFor(() => {
      expect(result.current.status).toBe("error");
    }, WAIT_OPTIONS);

    // 验证 HTTP 错误处理
    expect(result.current.error).toEqual(new Error("API error: 404"));
    expect(result.current.data).toBeNull();
  });

  it("should use cached data when available", async () => {
    // Setup
    const mockData = { result: "cached data" };
    const wrapper = createWrapper(); // 使用同一个包装器确保共享缓存

    // Setup for first render
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    // First render to populate cache
    let firstResult;
    let firstUnmount;

    await act(async () => {
      const rendered = renderHook(
        () => useBaseQuery("ted.farcaster", QueryEndpoint.PROFILE, false),
        { wrapper },
      );
      firstResult = rendered.result;
      firstUnmount = rendered.unmount;
      await flushPromises();
    });

    // 等待第一个请求完成
    await waitFor(() => {
      expect(firstResult.current.data).toEqual(mockData);
    }, WAIT_OPTIONS);

    // Reset fetch mock
    global.fetch.mockClear();

    // Unmount first hook
    firstUnmount();

    // Second render should use cached data
    let secondResult;
    await act(async () => {
      const rendered = renderHook(
        () => useBaseQuery("ted.farcaster", QueryEndpoint.PROFILE, false),
        { wrapper },
      );
      secondResult = rendered.result;
      await flushPromises();
    });

    // 验证数据从缓存中获取
    await waitFor(() => {
      expect(secondResult.current.data).toEqual(mockData);
    }, WAIT_OPTIONS);

    // 验证没有发出新的 fetch 请求
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
    let result;
    let rerender;

    await act(async () => {
      const rendered = renderHook(
        (props) =>
          useBaseQuery(props.identity, props.endpoint, props.universal),
        {
          initialProps: {
            identity: "web3.bio",
            endpoint: QueryEndpoint.PROFILE,
            universal: false,
          },
          wrapper,
        },
      );
      result = rendered.result;
      rerender = rendered.rerender;
      await flushPromises();
    });

    // 等待加载完成
    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    }, WAIT_OPTIONS);

    // Clear fetch mock
    global.fetch.mockClear();

    // Rerender with same props
    await act(async () => {
      rerender({
        identity: "web3.bio",
        endpoint: QueryEndpoint.PROFILE,
        universal: false,
      });
      await flushPromises();
    });

    // 验证没有发出额外的 fetch 请求
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
    let result;
    let rerender;

    await act(async () => {
      const rendered = renderHook(
        (props) =>
          useBaseQuery(props.identity, props.endpoint, props.universal),
        {
          initialProps: {
            identity: "wijuwiju.eth",
            endpoint: QueryEndpoint.PROFILE,
            universal: false,
          },
          wrapper,
        },
      );
      result = rendered.result;
      rerender = rendered.rerender;
      await flushPromises();
    });

    // 等待第一次渲染完成
    await waitFor(() => {
      expect(result.current.data).toEqual(firstMockData);
    }, WAIT_OPTIONS);

    // Rerender with different props
    await act(async () => {
      rerender({
        identity: "different.eth",
        endpoint: QueryEndpoint.PROFILE,
        universal: false,
      });
      await flushPromises();
    });

    // 等待第二次 fetch 完成
    await waitFor(() => {
      expect(result.current.data).toEqual(secondMockData);
    }, WAIT_OPTIONS);

    // 验证 fetch 被调用了两次 (每个身份各一次)
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
