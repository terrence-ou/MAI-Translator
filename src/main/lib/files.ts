import { ensureDir, readdir } from "fs-extra";

import { APP_HISTORY_DIR, FILE_ENCODING } from "@shared/consts";
import { homedir } from "os";

export const getFolderDir = () => {
  return `${homedir()}/${APP_HISTORY_DIR}`;
};

export const getHistories = async () => {
  const folderDir = getFolderDir();
  await ensureDir(folderDir);
  const filenames = await readdir(folderDir, { encoding: FILE_ENCODING });
  console.log(filenames);
};

// export const writeHistory = async (filename, content) => {
//   const folderDir = getFolderDir();

// };
