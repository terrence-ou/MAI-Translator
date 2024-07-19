import {
  ReadAPIsFn,
  WriteAPIsFn,
  GetDeepLFreeResultFn,
  GetClaudeResultFn,
  WriteHistoryFn,
  GetHistoriesFn,
} from "@shared/types";
import { contextBridge } from "electron";
import { ipcRenderer } from "electron/renderer";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the Browser window");
}

try {
  contextBridge.exposeInMainWorld("context", {
    readApis: (...args: Parameters<ReadAPIsFn>) => ipcRenderer.invoke("readApis", ...args),
    writeApis: (...args: Parameters<WriteAPIsFn>) => ipcRenderer.invoke("writeApis", ...args),
    getDeepLFreeResult: (...args: Parameters<GetDeepLFreeResultFn>) =>
      ipcRenderer.invoke("getDeepLFreeResult", ...args),
    getClaudeResult: (...args: Parameters<GetClaudeResultFn>) =>
      ipcRenderer.invoke("getClaudeResult", ...args),
    writeHistory: (...args: Parameters<WriteHistoryFn>) =>
      ipcRenderer.invoke("writeHistory", ...args),
    getHistories: (...args: Parameters<GetHistoriesFn>) =>
      ipcRenderer.invoke("getHistories", ...args),
  });
} catch (error) {
  console.error(error);
}
