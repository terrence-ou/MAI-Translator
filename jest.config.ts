import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  roots: ["src/renderer/src/__tests__"],
  preset: "ts-jest",
};

export default config;
