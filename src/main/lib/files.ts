import { ensureDir, readdir, writeFile, readFile } from "fs-extra";
import { APP_HISTORY_DIR, FILE_ENCODING } from "@shared/consts";
import { homedir } from "os";
import { GetHistoriesFn, WriteHistoryFn, Record, FilePreview } from "@shared/types";

export const getFolderDir = () => {
  return `${homedir()}/${APP_HISTORY_DIR}`;
};

export const getHistories: GetHistoriesFn = async () => {
  const folderDir = getFolderDir();
  await ensureDir(folderDir);
  const filenames = await readdir(folderDir, { encoding: FILE_ENCODING });
  const files = filenames.filter((filename) => filename.endsWith(".txt"));
  const output = {};
  await Promise.all(
    files.map(async (filename) => {
      const content = await getFileContent(filename);
      const { from, to, source } = content;
      const date = filename.slice(0, 8);
      if (!(date in output)) {
        output[date] = [];
      }
      output[date].push({
        filename,
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        brief: source.slice(0, 100),
      });
    })
  );
  return output as FilePreview;
};

export const writeHistory: WriteHistoryFn = async (content) => {
  const folderDir = getFolderDir();
  await ensureDir(folderDir);
  const filename = getTimeString();
  return writeFile(`${folderDir}/${filename}.txt`, JSON.stringify(content));
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

const getFileContent = async (filename: string): Promise<Record> => {
  const file = await readFile(`${homedir()}/${APP_HISTORY_DIR}/${filename}`, {
    encoding: FILE_ENCODING,
  });
  const content = JSON.parse(file);
  return content as Record;
};
