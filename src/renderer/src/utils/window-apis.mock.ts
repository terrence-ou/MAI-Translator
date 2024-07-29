const matchMedia = Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const themedMatchMedia = (maches: boolean) =>
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: maches,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

const context = Object.defineProperty(window, "context", {
  writable: true,
  value: {
    readApis: jest.fn().mockImplementation(() => Promise.resolve({})),
    writeApis: jest.fn().mockImplementation(() => Promise.resolve({})),
    getHistories: jest.fn().mockImplementation(() =>
      Promise.resolve({
        "20240729": [{ from: "EN", to: "ZH", brief: "hello world", filename: "202407290000.txt" }],
        "20240730": [{ from: "ZH", to: "EN", brief: "测试边栏", filename: "202407300000.txt" }],
      })
    ),
    getFileContent: jest.fn().mockImplementation((filename: string) =>
      Promise.resolve({
        from: "EN",
        to: "ZH",
        translations: [{ aiSource: "DeepL", text: "hello world" }],
        filename: filename,
      })
    ),
    writeHistory: jest.fn().mockImplementation(() => Promise.resolve("20240101.txt")),
    getDeepLFreeResult: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ detected_source_language: "EN", text: "mock result" })
      ),
    getClaudeResult: jest.fn().mockImplementation(() => Promise.resolve("mock result")),
  },
});

const clipboard = Object.defineProperty(navigator, "clipboard", {
  writable: true,
  value: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve("Text copied!")),
  },
});

export { matchMedia, themedMatchMedia, context, clipboard };
