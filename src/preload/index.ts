import { ReadAPIsFn, WriteAPIsFn } from "@shared/types";
import { contextBridge } from "electron";
import { ipcRenderer } from "electron/renderer";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the Browser window");
}

try {
  contextBridge.exposeInMainWorld("context", {
    readApis: (...args: Parameters<ReadAPIsFn>) => ipcRenderer.invoke("readApis", ...args),
    writeApis: (...args: Parameters<WriteAPIsFn>) => ipcRenderer.invoke("writeApis", ...args),
  });
} catch (error) {
  console.error(error);
}
