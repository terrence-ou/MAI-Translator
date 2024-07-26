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
    getHistories: jest.fn().mockImplementation(() => Promise.resolve({})),
    writeHistory: jest.fn().mockImplementation(() => Promise.resolve("20240101.txt")),
    getClaudeResult: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ from: "ZH", to: "EN", text: "mock result" })),
    getDeepLFreeResult: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ from: "ZH", to: "EN", text: "mock result" })),
  },
});

const clipboard = Object.defineProperty(navigator, "clipboard", {
  writable: true,
  value: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve("Text copied!")),
  },
});

export { matchMedia, themedMatchMedia, context, clipboard };
