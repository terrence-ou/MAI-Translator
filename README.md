<h1 align="center"> MAI Translator - a multi-ai supported translator </h1>
<p align="center">A multi-ai-supported translator helps getting and managing translations with confidence.</p>
<image src="./public/cover.png" width="100%"/>
<div align="center">

  **Website**: https://terrence-ou.github.io/MAI-Translator-Website/
  <br />
  <br />
  [![Release app](https://github.com/terrence-ou/MAI-Translator/actions/workflows/release.yml/badge.svg)](https://github.com/terrence-ou/MAI-Translator/actions/workflows/release.yml) [![Test](https://github.com/terrence-ou/MAI-Translator/actions/workflows/unit_test.yml/badge.svg)](https://github.com/terrence-ou/MAI-Translator/actions/workflows/unit_test.yml)
  <img height="20px" src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="LICENSE"/>
  <br/>
</div>

## A translator for users who pursuit translation quality


The **MAI Translator** helps to retrieve translation results from popular language model providers such as DeepL, Claude, and OpenAI. It allows users to compare different versions of translations and select the words, sentences, or paragraphs that best fit the context. Additionally, the MAI Translator enables users to store translation results locally, which can be retrieved at any time as needed. The app also supports text-to-speech readers with enriched voice selections that help get a better sense of the contents.

## Features

1. Fetching translation results from multiple LLM providers with rich model selections;
2. Manage translation records locally with easy file drag-n-drop features;
3. Light / Dark theme;
4. Text-to-Speech-supported text reader with multiple voices enabled;

<p align="center">
  <image src="./public/demo.gif" width="600px"/>
</p>

## Get Started

You'll need API keys from OpenAI, DeepL, and Claude to ensure translations work properly. The app can still work when one or two keys are missing. However,  the OpenAI API key is required for the Text-to-Speech functionalities if the text reader is important to you.
- Get OpenAI API key: https://platform.openai.com/docs/overview
- Get Claude API key: https://console.anthropic.com/dashboard
- Get DeepL Api Key: https://www.deepl.com/en/pro-api (Free version api key is good enough)

## Tech Stack

- **Software Framework**: \t     [Electron](https://www.electronjs.org/)
- **Frontend Library**: \t       [React](https://react.dev/)
- **Build Tool**: \t             [Vite](https://vite.dev/)
- **State Management**: \t       [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI and Styling**: \t         [shadcn](https://ui.shadcn.com/), [tailwind](https://tailwindcss.com/)
- **Testing**: \t                [Jest](https://jestjs.io/), [Testing Library](https://testing-library.com/)
- **Code Sign and Notarize**: \t [Electron-forge](https://www.electronforge.io/)


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
