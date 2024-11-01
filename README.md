<h1 align="center"> MAI Translator - a multi-ai supported translator </h1>
<image src="./public/cover.png" width="100%"/>
<p align="center">A multi-ai-supported translator helps getting and managing translations with confidence.</p>
<div align="center">

  **Website**: https://terrence-ou.github.io/MAI-Translator-Website/
  <br />
  [![Release app](https://github.com/terrence-ou/MAI-Translator/actions/workflows/release.yml/badge.svg)](https://github.com/terrence-ou/MAI-Translator/actions/workflows/release.yml) [![Test](https://github.com/terrence-ou/MAI-Translator/actions/workflows/unit_test.yml/badge.svg)](https://github.com/terrence-ou/MAI-Translator/actions/workflows/unit_test.yml)
  <img height="20px" src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="LICENSE"/>
  <br/>
</div>

## A translator for users who pursuit translation quality


The MAI Translator helps to retrieve translation results from popular language model providers such as DeepL, Claude, and OpenAI. It allows users to compare different versions of translations and select the words, sentences, or paragraphs that best fit the context. Additionally, the MAI Translator enables users to store translation results locally, which cian be retrieved at any time as needed. Currently the translation histories supports text-to-speech reader.

## Features

1. Fetching translation results from multiple LLM providers with rich model selections;
2. Manage translation records locally, with easy drag-n-drop features;
3. Light / Dark theme;
4. Text-to-Speech-supported text reader with multiple voices enabled;

<p align="center">
  <image src="./public/demo.gif" width="600px"/>
</p>

## Get Started

You'll need APIs from OpenAI, DeepL, and Claude to ensure translations working porperly; OpenAI api is required for the Text-to-Speech functionalities.

## Tech Stack

- *Software Framework*: [Electron](https://www.electronjs.org/)
- *Frontend Library*: [React](https://react.dev/)
- *Build Tool*: [Vite](https://vite.dev/)
- *State Management*: [Redux Toolkit](https://redux-toolkit.js.org/)
- *UI and Styling*: [shadcn](https://ui.shadcn.com/), [tailwind](https://tailwindcss.com/)
- *Testing*: [Jest](https://jestjs.io/), [Testing Library](https://testing-library.com/)
- *Apple Code Sign and Notarize*: [Electron-forge](https://www.electronforge.io/)


## File Structure

```
├── .github/
│   └── workflows/                  # GitHub Actions for CI/CD
├── public/                         # Static assets (images, icons, HTML)
├── resources/                      # Additional resources for the app
├── src/                            # Main source code
│   ├── main/                       # Main process code
│   │   ├── assets/                 # Assets for the main process
│   │   ├── lib/                    # Libraries for main process logic
│   │   └── index.ts                # Entry point for the main process
│   ├── preload/                    # Preload scripts
│   │   ├── index.ts                # Preload script entry point
│   │   └── index.d.ts              # TypeScript declarations for preload
│   ├── renderer/                   # Renderer process code (front-end)
│   │   ├── src/                    # Source for renderer
│   │   │   ├── __tests__/          # Tests for renderer components
│   │   │   ├── assets/             # Assets for the renderer
│   │   │   ├── components/         # React components
│   │   │   ├── hooks/              # Custom React hooks
│   │   │   ├── store/              # Redux State management
│   │   │   └── utils/              # Utility functions
│   │   ├── App.tsx                 # Main application component
│   │   ├── env.d.ts                # TypeScript environment declarations
│   │   ├── main.tsx                # Main entry point for the renderer
│   │   └── index.html              # HTML template for the renderer
│   └── shared/                     # Shared code between main and renderer
├── .gitignore                      # Git ignore patterns
├── components.json                 # Component manifest/configuration
├── electron.vite.config.ts         # Vite configuration for Electron
├── forge.config.cjs                # Electron Forge configuration
├── jest.config.ts                  # Jest testing configuration
├── LICENSE                         # Project license
├── package.json                    # Project metadata and dependencies
├── package-lock.json               # Dependency lock file
├── postcss.config.js               # PostCSS configuration
├── README.md                       # Project documentation
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration (general)
├── tsconfig.node.json              # TypeScript configuration for Node.js
└── tsconfig.web.json               # TypeScript configuration for web
```
