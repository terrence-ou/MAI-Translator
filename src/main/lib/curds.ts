import { OpenAI, DeepL, Claude } from "ai-fetcher";
import {
  GetDetectionTranslationResultFn,
  GetTranslationResultFn,
  TextToSpeechFn,
} from "@shared/types";
import { MAX_TOKENS, TRANSLATION_FAIL_MESSAGE } from "@shared/consts";
import { PROMPTS } from "@shared/prompts";
import { readModelConfigs } from "./files";

// Get translation result from DeepL with free api
export const getDeepLFreeResult: GetDetectionTranslationResultFn = async (from, to, text) => {
  const modelConfigs = readModelConfigs();
  const { key, model } = modelConfigs["DeepL"];
  const isPro = model === "pro";
  const deepLAgent = new DeepL(key, isPro);
  try {
    const deepLResult = await deepLAgent.translate({
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      text,
    });
    return deepLResult.translations[0];
  } catch (error) {
    console.error("Error calling DeepL API", error);
  }
  return { detected_source_language: "", text: TRANSLATION_FAIL_MESSAGE };
};

// Get translation result from claude api
export const getClaudeResult: GetTranslationResultFn = async (from, to, text) => {
  const modelConfigs = readModelConfigs();
  const { key, model } = modelConfigs["Claude"];
  const claudeAgent = new Claude(key, model);
  try {
    const messages = [
      { role: PROMPTS.role, content: [{ type: "text", text: PROMPTS.content(from, to, text) }] },
    ];
    const claudeResult = await claudeAgent.generate(PROMPTS.system, messages, 0, MAX_TOKENS);
    const outputText = claudeResult.content[0].text;
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
  const openAIAgent = OpenAI.chat(key, model);
  try {
    const messages = [
      {
        role: PROMPTS.role as "user",
        content: PROMPTS.content(from, to, text),
      },
    ];
    const openAIResult = await openAIAgent.generate(messages, PROMPTS.system);
    const outputText = openAIResult.choices[0].message.content;
    return outputText;
  } catch (error) {
    console.error("Error calling OpenAI API", error);
  }
  return TRANSLATION_FAIL_MESSAGE;
};

// Get the audio of the given text
export const textToSpeech: TextToSpeechFn = async (text, voice) => {
  const modelConfigs = readModelConfigs();
  const { key } = modelConfigs["OpenAI"];
  const openAIAgent = OpenAI.textToSpeech(key);
  try {
    const openAIResult = await openAIAgent.convert(text, "base64", undefined, voice);
    return openAIResult as string;
  } catch (error) {
    console.error(error);
  }
  return undefined;
};
