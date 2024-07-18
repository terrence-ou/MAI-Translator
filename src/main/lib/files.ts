import { ensureDir, readdir, writeFile } from "fs-extra";

import { APP_HISTORY_DIR, FILE_ENCODING } from "@shared/consts";
import { homedir } from "os";
import { WriteHistoryFn } from "@shared/types";

export const getFolderDir = () => {
  return `${homedir()}/${APP_HISTORY_DIR}`;
};

export const getHistories = async () => {
  const folderDir = getFolderDir();
  await ensureDir(folderDir);
  const filenames = await readdir(folderDir, { encoding: FILE_ENCODING });
  console.log(filenames);
};

export const writeHistory: WriteHistoryFn = async (content) => {
  const folderDir = getFolderDir();
  await ensureDir(folderDir);
  const filename = getTimeString();
  return writeFile(`${folderDir}/${filename}.txt`, JSON.stringify(content));
};

const getTimeString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth()).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}${hour}${minutes}${seconds}`;
};
