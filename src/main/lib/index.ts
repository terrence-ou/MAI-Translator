import axios from "axios";
import { ReadAPIsFn, WriteAPIsFn, APIType, GetDeepLFreeResultFn, DeepLResult } from "@shared/types";
import { API_FILENAME } from "@shared/consts";
// import { defaultSettings } from "@shared/default";
import { app } from "electron";
import fs from "fs";
import path from "path";

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

export const writeApis: WriteAPIsFn = async (apis) => {
  const filePath = path.join(app.getPath("userData"), API_FILENAME);
  try {
    fs.writeFileSync(filePath, JSON.stringify(apis, null, 2));
  } catch (error) {
    console.error(error);
  }
};

export const getDeepLFreeResult: GetDeepLFreeResultFn = async (from, to, text) => {
  const filePath = path.join(app.getPath("userData"), API_FILENAME);
  const file = fs.readFileSync(filePath, { encoding: "utf8" });
  const apis = JSON.parse(file) as APIType;
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
  return response.data.translations[0] as DeepLResult;
};
