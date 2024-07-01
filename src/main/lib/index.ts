import { ReadAPIsFn, WriteAPIsFn, APIs } from "@shared/types";
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
    writeApis([] as APIs);
  }
  const file = fs.readFileSync(filePath, { encoding: "utf8" });
  const apis = JSON.parse(file) as APIs;
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
