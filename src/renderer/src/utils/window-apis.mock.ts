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
    // getDeepLFreeResult: jest.fn().mockImplementation(() => Promise.resolve)
  },
});

export { matchMedia, themedMatchMedia, context };
