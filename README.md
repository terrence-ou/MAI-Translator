<h1 align="center"> MAI Translator - a multi-ai supported translator </h1>
<image src="./public/cover.png" width="100%"/>
<p align="center">A multi-ai-supported translator helps getting and managing translations with confidence.</p>
<div align="center">

  **Website**: https://terrence-ou.github.io/MAI-Translator-Website/
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

## Updates
- **v-0.6.1** *10/26/2024*
  - Latest Claude Sonnet 3.5 model enabled;
---
- **v-0.6.0** *10/22/2024*
  - Added a right-click menu for the side bar history card, with "save as" and "delete" actions available;
  - Added "clear" button to the result text area;
---
- **v-0.5.4** *10/06/2024*
  - Sidebar display bug fixed.
- **v-0.5.3** *10/03/2024*
  - Text-to-speech voice selection added.
- **v-0.5.1 & v0.5.2** *09/28/2024*
  - Introduced `ai-fetcher` to simplify the data-fetching process;
  - Native drag and drop added, enabling drag translation history as a markdown file to local directory.
---
- **v-0.4.1 & v-0.4.2** *09/05/2024*
  - AI model configs updated, the user now can select specific models;
  - Added Apple code sign and notary;
- **v-0.4.0** *09/01/2024*
  - Upgraded Electron to version 32, the latest stable version;
  - Traditional Chinese support (ZH-HANT) added;
---
- **v-0.3.0**
  - Integrated OpenAI TTS model to text reading. (The reading quality is way better than the Chrome reader)
---
- **v-0.2.1 & v-0.2.2**
  - Tooltips added.
  - Translation history becomes expandable by date
- **v-0.2.0**
  - Added a navigation menu.
  - Updated translation record interface, displaying the record on a whole page instead of a modal now.
  - Added OpenAI support.
