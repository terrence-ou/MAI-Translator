import { homedir } from "os";
import { app, dialog, IpcMainInvokeEvent } from "electron";
import path from "path";
import fs from "fs";
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
  SaveAsFileFn,
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

// Native drag and drop; drag the translation history to local folder
export const onDragStart = (event: IpcMainInvokeEvent, filename: string) => {
  const historyPath = `${homedir()}/${APP_HISTORY_DIR}`; // the dir stores the translation history
  const markdownFile = `${filename.split(".txt")[0]}.md`; // new markdown file

  const txtFilePath = `${historyPath}/${filename}`; // the txt file (JSON)
  const mdfilePath = `${historyPath}/${markdownFile}`; // the md file (Markdown for drag and drop)

  const markdownContent = convertToMarkdown(txtFilePath);
  fs.writeFileSync(mdfilePath, markdownContent);

  event.sender.startDrag({
    file: mdfilePath,
    icon: dragIcon,
  });
};

// Save file with a save dialog open
export const saveAsFile: SaveAsFileFn = (filename) => {
  const historyPath = `${homedir()}/${APP_HISTORY_DIR}`; // the dir stores the translation history
  const markdownFilename = `${filename.split(".txt")[0]}.md`; // new markdown file

  const sourcePath = `${historyPath}/${filename}`; // the txt file (JSON)
  let savePath = dialog.showSaveDialogSync({
    properties: ["createDirectory"],
    defaultPath: `~/${markdownFilename}`,
    title: `${markdownFilename}`,
  });
  if (savePath === undefined) return;
  if (!savePath.endsWith(".md")) savePath += ".md";
  const markdownContent = convertToMarkdown(sourcePath);
  fs.writeFileSync(savePath, markdownContent);
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

const convertToMarkdown = (filepath: string) => {
  const content = fs.readFileSync(filepath, { encoding: "utf8" });
  const jsonContent = JSON.parse(content) as Record;
  // extract translations and join them into a single string
  const translations = jsonContent
    .translations!.map(
      ({ aiSource, text }) => "\n" + "*AI Service: " + aiSource + "*" + "\n\n" + text + "\n"
    )
    .join("");
  // create markdown content
  const mdContent = `## From: ${jsonContent.from.toUpperCase()}\n## To: ${jsonContent.to.toUpperCase()}\n\n## Source Text:\n\n${jsonContent.source}\n\n## Translations: \n${translations}`;
  return mdContent;
};
