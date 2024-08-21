<h1 align="center"> MAI Translator - a multi-ai supported translator </h1>
<image src="./public/cover.png" width="100%"/>
<p align="center">A multi-ai-supported translator helps getting and managing translations with confidence.</p>
<div align="center">

  [![Release app](https://github.com/terrence-ou/MAI-Translator/actions/workflows/release.yml/badge.svg)](https://github.com/terrence-ou/MAI-Translator/actions/workflows/release.yml) [![Test](https://github.com/terrence-ou/MAI-Translator/actions/workflows/unit_test.yml/badge.svg)](https://github.com/terrence-ou/MAI-Translator/actions/workflows/unit_test.yml)
  <br/>
  <img height="20px" src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="LICENSE"/>
  <img height="20px" src="https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white" alt="react"/>
  <img height="20px" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript"/>
  <img height="20px" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react"/>
</div>

## A translator for users who pursuit translation quality

The MAI Translator helps to retrieve translation results from popular language model providers such as DeepL, Claude, and OpenAI. It allows users to compare different versions of translations and select the words, sentences, or paragraphs that best fit the context. Additionally, the MAI Translator enables users to store translation results locally, which cian be retrieved at any time as needed. Currently the translation histories supports text-to-speech reader.

## Features

1. Fetching translation results from multiple language model providers;
2. Manage translation records locally;
3. Light / Dark theme;
4. Text-to-Speech-supported text reader;

<p align="center">
  <image src="./public/demo.gif" width="600px"/>
</p>

## Updates
- *v-0.3.0*
  - Integrated OpenAI TTS model to text reading. (The reading quality is way better than the Chrome reader)
- *v-0.2.1 & v-0.2.2*
  - Tooltips added.
  - Translation history becomes expandable by date
- *v-0.2.0*
  - Added a navigation menu.
  - Updated translation record interface, displaying the record on a whole page instead of a modal now.
  - Added OpenAI support.

## Preparation

For this BETA version, the user needs to provide DeepL free API and Claude API in the Settings to make the translation work.

## Sorry, but...

1. Limited language support due to the language model provider.
2. Unexpected translation errors might occur.
3. The software is still under heavy development; only MacOS version available for now.
