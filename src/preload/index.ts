import { contextBridge } from "electron";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the Browser window");
}

try {
  contextBridge.exposeInMainWorld("context", {});
} catch (error) {
  console.error(error);
}
