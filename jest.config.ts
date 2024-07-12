import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  testEnvironment: "jsdom",
  roots: ["src/renderer/src/__tests__"],
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.web.json",
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/renderer/src/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/src/renderer/src/components/ui/",
  ],
};

export default config;
