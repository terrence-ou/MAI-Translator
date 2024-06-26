import { editorSettingsType, ReadSettings, WriteSettings } from "@shared/types";
import { defaultSettings } from "@shared/default";
import { app } from "electron";
import fs from "fs";
import path from "path";

export const readSettings: ReadSettings = async () => {
  // check if setting.json file exists
  const filePath = path.join(app.getPath("userData"), "settings.json");
  // if not, create one with the default values
  if (!fs.existsSync(filePath)) {
    writeSettings(defaultSettings);
  }
  const file = fs.readFileSync(filePath, { encoding: "utf8" });
  const settings = JSON.parse(file) as editorSettingsType;
  return settings;
};

export const writeSettings: WriteSettings = async (settings) => {
  const filePath = path.join(app.getPath("userData"), "settings.json");
  try {
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error(error);
  }
};
