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
    writeModelConfigs: jest.fn().mockImplementation(),
    // translation config functions
    writeHistory: jest.fn().mockImplementation(() => Promise.resolve("20240101.txt")),
    getDeepLFreeResult: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ detected_source_language: "EN", text: "mock result" })
      ),
    getClaudeResult: jest.fn().mockImplementation(() => Promise.resolve("mock result")),
    getOpenAIResult: jest.fn().mockImplementation(() => Promise.resolve("mock result")),
    // file management functions
    getHistories: jest.fn().mockImplementation(() =>
      Promise.resolve({
        "20240819": [
          {
            filename: "20240819222854.txt",
            from: "JA",
            to: "ZH",
            brief: "test1",
          },
        ],
        "20240921": [
          {
            filename: "20240921182814.txt",
            from: "ZH",
            to: "EN",
            brief: "test2",
          },
        ],
      })
    ),
    getFileContent: jest.fn().mockImplementation((filename: string) => {
      if (filename === "20240819222854.txt" || filename === "0240921182814.txt") {
        return Promise.resolve({
          from: "EN",
          to: "ZH",
          translations: [{ aiSource: "DeepL", text: "hello world" }],
          filename: filename,
        });
      } else return null;
    }),
    deleteFile: jest.fn().mockImplementation((filename: string) => {
      if (filename === "202407290000.txt" || filename === "202407300000.txt") {
        return true;
      } else return false;
    }),
  },
});

const clipboard = Object.defineProperty(navigator, "clipboard", {
  writable: true,
  value: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve("Text copied!")),
  },
});

const audioMedia = Object.defineProperty(HTMLMediaElement.prototype, "pause", {
  configurable: true,
  value: jest.fn(),
});

export { matchMedia, audioMedia, themedMatchMedia, context, clipboard };
