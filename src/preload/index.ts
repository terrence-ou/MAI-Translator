import {
  ReadAPIsFn,
  WriteAPIsFn,
  WriteHistoryFn,
  GetHistoriesFn,
  GetFileContentFn,
  DeleteFileFn,
  GetDetectionTranslationResultFn,
  GetTranslationResultFn,
  TextToSpeechFn,
  ReadModelConfigsFn,
  WriteModelConfigsFn,
} from "@shared/types";
import { contextBridge } from "electron";
import { ipcRenderer } from "electron/renderer";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the Browser window");
}

try {
  contextBridge.exposeInMainWorld("context", {
    // curds
    getDeepLFreeResult: (...args: Parameters<GetDetectionTranslationResultFn>) =>
      ipcRenderer.invoke("getDeepLFreeResult", ...args),
    getClaudeResult: (...args: Parameters<GetTranslationResultFn>) =>
      ipcRenderer.invoke("getClaudeResult", ...args),
    getOpenAIResult: (...args: Parameters<GetTranslationResultFn>) =>
      ipcRenderer.invoke("getOpenAIResult", ...args),
    textToSpeech: (...args: Parameters<TextToSpeechFn>) =>
      ipcRenderer.invoke("textToSpeech", ...args),
    // file management
    readApis: (...args: Parameters<ReadAPIsFn>) => ipcRenderer.invoke("readApis", ...args),
    writeApis: (...args: Parameters<WriteAPIsFn>) => ipcRenderer.invoke("writeApis", ...args),
    readModelConfigs: (...args: Parameters<ReadModelConfigsFn>) =>
      ipcRenderer.invoke("readModelConfigs", ...args),
    writeModelConfigs: (...args: Parameters<WriteModelConfigsFn>) =>
      ipcRenderer.invoke("writeModelConfigs", ...args),
    writeHistory: (...args: Parameters<WriteHistoryFn>) =>
      ipcRenderer.invoke("writeHistory", ...args),
    getHistories: (...args: Parameters<GetHistoriesFn>) =>
      ipcRenderer.invoke("getHistories", ...args),
    getFileContent: (...args: Parameters<GetFileContentFn>) =>
      ipcRenderer.invoke("getFileContent", ...args),
    deleteFile: (...args: Parameters<DeleteFileFn>) => ipcRenderer.invoke("deleteFile", ...args),
  });
} catch (error) {
  console.error(error);
}
