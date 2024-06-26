import { ReadSettings } from "@shared/types";
import { contextBridge } from "electron";
import { ipcRenderer } from "electron/renderer";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the Browser window");
}

try {
  contextBridge.exposeInMainWorld("context", {
    readSettings: (...args: Parameters<ReadSettings>) =>
      ipcRenderer.invoke("readSettings", ...args),
  });
} catch (error) {
  console.error(error);
}
