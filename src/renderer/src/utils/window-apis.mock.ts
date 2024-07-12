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

const context = Object.defineProperty(window, "context", {
  writable: true,
  value: {
    readApis: jest.fn().mockImplementation(() => Promise.resolve({})),
    writeApis: jest.fn().mockImplementation(() => Promise.resolve({})),
  },
});

export { matchMedia, context };
