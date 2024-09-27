import { homedir } from "os";
import { app, IpcMainInvokeEvent } from "electron";
import path from "path";
import fs from "fs";
import { dialog } from "electron";
import { ensureDir, readdir, writeFile, readFile, remove } from "fs-extra";
import dragIcon from "../assets/empty_icon.png?asset";
import {
  APP_HISTORY_DIR,
  BRIEF_DISPLAY_LENGTH,
  FILE_ENCODING,
  MODEL_CONFIGS_FILENAME,
  INIT_MODEL_CONFIGS,
} from "@shared/consts";
import {
  GetHistoriesFn,
  WriteHistoryFn,
  Record,
  FilePreview,
  GetFileContentFn,
  DeleteFileFn,
  ModelConfigs,
  WriteModelConfigsFn,
  ReadModelConfigsFn,
} from "@shared/types";

export const getFolderDir = () => {
  return `${homedir()}/${APP_HISTORY_DIR}`;
};

// read model configs from the local file
export const readModelConfigs: ReadModelConfigsFn = () => {
  const filePath = path.join(app.getPath("userData"), MODEL_CONFIGS_FILENAME);
  // if the model config file does not exist, create one with default value
  if (!fs.existsSync(filePath)) {
    writeModelConfigs(INIT_MODEL_CONFIGS as ModelConfigs);
  }
  const file = fs.readFileSync(filePath, { encoding: "utf8" });
  const modelConfigs = JSON.parse(file) as ModelConfigs;
  return modelConfigs;
};

// write model configs
export const writeModelConfigs: WriteModelConfigsFn = (modelConfigs) => {
  const filePath = path.join(app.getPath("userData"), MODEL_CONFIGS_FILENAME);
  try {
    fs.writeFileSync(filePath, JSON.stringify(modelConfigs, null, 2));
  } catch (error) {
    console.error(error);
  }
};

// load local files
export const getHistories: GetHistoriesFn = async () => {
  const folderDir = getFolderDir();
  await ensureDir(folderDir);
  const filenames = await readdir(folderDir, { encoding: FILE_ENCODING });
  const files = filenames.filter((filename) => filename.endsWith(".txt"));
  const output = {};
  await Promise.all(
    files.map(async (filename) => {
      const content = await getFileContent(filename);
      const { from, to, source } = content!;
      const date = filename.slice(0, 8);
      if (!(date in output)) {
        output[date] = [];
      }
      output[date].push({
        filename,
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        brief: source!.slice(0, BRIEF_DISPLAY_LENGTH),
      });
    })
  );
  return output as FilePreview;
};

// write the current translation data to a local file
export const writeHistory: WriteHistoryFn = async (content) => {
  const folderDir = getFolderDir();
  await ensureDir(folderDir);
  const filename = `${getTimeString()}.txt`;
  try {
    await writeFile(`${folderDir}/${filename}`, JSON.stringify(content));
    return filename;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

// get file content based on the filename provided
export const getFileContent: GetFileContentFn = async (filename) => {
  try {
    const file = await readFile(`${homedir()}/${APP_HISTORY_DIR}/${filename}`, {
      encoding: FILE_ENCODING,
    });
    const content = JSON.parse(file);
    return content as Record;
  } catch (error) {
    console.error(error);
  }
  return null;
};

// delete the file
export const deleteFile: DeleteFileFn = async (filename) => {
  const { response } = await dialog.showMessageBox({
    type: "warning",
    title: "Delete Record",
    message: "Are you sure you want to delete this record?",
    buttons: ["Delete", "Cancel"],
    defaultId: 1,
    cancelId: 1,
  });

  if (response === 0) {
    try {
      await remove(`${getFolderDir()}/${filename}`);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  return false;
};

// Native drag
export const onDragStart = (event: IpcMainInvokeEvent, filename: string) => {
  event.sender.startDrag({
    file: `${homedir()}/${APP_HISTORY_DIR}/${filename}`,
    icon: dragIcon,
  });
};

// Helper functions
const getTimeString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}${hour}${minutes}${seconds}`;
};
