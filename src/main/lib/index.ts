import {
  ReadAPIsFn,
  WriteAPIsFn,
  APIType,
  GetDeepLFreeResultFn,
  GetClaudeResultFn,
  DetectionTranslationOutput,
} from "@shared/types";
import { API_FILENAME, TRANSLATION_FAIL_MESSAGE } from "@shared/consts";
import { CLAUDE_PROMPTS } from "@shared/prompts";
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
  try {
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
    return response.data.translations[0] as DetectionTranslationOutput;
  } catch (error) {
    console.log(error);
  }
  return { detected_source_language: "", text: TRANSLATION_FAIL_MESSAGE };
};

// Get translation result from claude api
export const getClaudeResult: GetClaudeResultFn = async (from, to, text) => {
  const apis = await readApis();
  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-haiku-20240307",
        max_tokens: 4096,
        temperature: 0,
        system: CLAUDE_PROMPTS.system,
        messages: [
          {
            role: CLAUDE_PROMPTS.role,
            content: CLAUDE_PROMPTS.content(from, to, text),
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
    return outputText;
  } catch (error) {
    console.error("Error calling Claude API", error);
  }
  return TRANSLATION_FAIL_MESSAGE;
};
