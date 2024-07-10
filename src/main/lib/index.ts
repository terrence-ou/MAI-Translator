import {
  ReadAPIsFn,
  WriteAPIsFn,
  APIType,
  GetDeepLFreeResultFn,
  TranslationOutput,
  GetClaudeResultFn,
} from "@shared/types";
import { API_FILENAME } from "@shared/consts";
import axios from "axios";
import { app } from "electron";
import fs from "fs";
import path from "path";

// read apis from the local file
export const readApis: ReadAPIsFn = async () => {
  // check if setting.json file exists
  const filePath = path.join(app.getPath("userData"), API_FILENAME);
  // if not, create one with the default values
  if (!fs.existsSync(filePath)) {
    writeApis({} as APIType);
  }
  const file = fs.readFileSync(filePath, { encoding: "utf8" });
  const apis = JSON.parse(file) as APIType;
  return apis;
};

// write apis to the local file
export const writeApis: WriteAPIsFn = async (apis) => {
  const filePath = path.join(app.getPath("userData"), API_FILENAME);
  try {
    fs.writeFileSync(filePath, JSON.stringify(apis, null, 2));
  } catch (error) {
    console.error(error);
  }
};

// Get translation result from DeepL with free api
export const getDeepLFreeResult: GetDeepLFreeResultFn = async (from, to, text) => {
  const apis = await readApis();
  // Send translation request
  const response = await axios.post(
    "https://api-free.deepl.com/v2/translate",
    {
      text: [text],
      target_lang: to.toUpperCase(),
      source_lang: from.toUpperCase(),
    },
    {
      headers: {
        Authorization: `DeepL-Auth-Key ${apis.DeepL}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.translations[0] as TranslationOutput;
};

export const getClaudeResult: GetClaudeResultFn = async (from, to, text) => {
  try {
    const apis = await readApis();
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages", // Replace with the correct Claude API endpoint
      {
        model: "claude-3-haiku-20240307",
        max_tokens: 4096,
        temperature: 0,
        system:
          "You are a professional translation capable of translating between multiple languages.",
        messages: [
          {
            role: "user",
            content: `Translate the following source text from {from_language: ${from.length === 0 ? "undetected" : from}} to {to_language: ${to}}. If the from_language is empty or null, just neglect that variable and auto detect the input language. Return result only. source text: ${text}. Please return the translated result only.`,
          },
        ],
      },
      {
        headers: {
          "x-api-key": `${apis.Claude}`,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
      }
    );
    const outputText = response.data.content[0].text as string;
    return { detected_source_language: "", text: outputText } as TranslationOutput;
  } catch (error) {
    console.error("Error calling Claude API", error);
    throw error;
  }
};
