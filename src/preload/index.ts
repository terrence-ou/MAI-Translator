import {
  WriteHistoryFn,
  GetHistoriesFn,
  GetFileContentFn,
  DeleteFileFn,
  GetDetectionTranslationResultFn,
  GetTranslationResultFn,
  TextToSpeechFn,
  ReadModelConfigsFn,
  WriteModelConfigsFn,
  OnDragStartFn,
  SaveAsFileFn,
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
    onDragStart: (...args: Parameters<OnDragStartFn>) => ipcRenderer.invoke("onDragStart", ...args),
    saveAsFile: (...args: Parameters<SaveAsFileFn>) => ipcRenderer.invoke("saveAsFile", ...args),
  });
} catch (error) {
  console.error(error);
}
