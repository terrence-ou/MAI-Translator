import axios from "axios";
import {
  GetDetectionTranslationResultFn,
  GetTranslationResultFn,
  DetectionTranslationOutput,
  TextToSpeechFn,
} from "@shared/types";
import { MAX_TOKENS, TRANSLATION_FAIL_MESSAGE } from "@shared/consts";
import { PROMPTS } from "@shared/prompts";
import { readModelConfigs } from "./files";

// Get translation result from DeepL with free api
export const getDeepLFreeResult: GetDetectionTranslationResultFn = async (from, to, text) => {
  // const apis = await readApis();
  const modelConfigs = readModelConfigs();
  const { key, model } = modelConfigs["DeepL"];
  const url =
    model === "free"
      ? "https://api-free.deepl.com/v2/translate"
      : "https://api.deepl.com/v2/translate";
  try {
    // Send translation request
    const response = await axios.post(
      url,
      {
        text: [text],
        target_lang: to.toUpperCase(),
        source_lang: from.toUpperCase(),
      },
      {
        headers: {
          Authorization: `DeepL-Auth-Key ${key}`,
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
export const getClaudeResult: GetTranslationResultFn = async (from, to, text) => {
  // const apis = await readApis();
  const modelConfigs = readModelConfigs();
  const { key, model } = modelConfigs["Claude"];
  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: model,
        max_tokens: MAX_TOKENS,
        temperature: 0,
        system: PROMPTS.system,
        messages: [
          {
            role: PROMPTS.role,
            content: PROMPTS.content(from, to, text),
          },
        ],
      },
      {
        headers: {
          "x-api-key": `${key}`,
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

// Get translation result from openai api
export const getOpenAIResult: GetTranslationResultFn = async (from, to, text) => {
  // const apis = await readApis();
  const modelConfigs = readModelConfigs();
  const { key, model } = modelConfigs["OpenAI"];
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: model,
        max_tokens: 4096,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        messages: [
          {
            role: "system",
            content: [{ type: "text", text: PROMPTS.system + PROMPTS.content(from, to) }],
          },
          {
            role: PROMPTS.role,
            content: [{ type: "text", text }],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      }
    );
    const outputText = response.data.choices[0].message.content as string;
    return outputText;
  } catch (error) {
    console.error("Error calling OpenAI API", error);
  }
  return TRANSLATION_FAIL_MESSAGE;
};

// Get the audio of the given text
export const textToSpeech: TextToSpeechFn = async (text) => {
  const modelConfigs = readModelConfigs();
  const { key } = modelConfigs["OpenAI"];
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/speech",
      {
        model: "tts-1",
        input: text,
        voice: "alloy",
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );
    return response.data.toString("base64");
  } catch (error) {
    console.error(error);
  }
  return undefined;
};
