import { app, shell, BrowserWindow, ipcMain, nativeImage } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import iconPath from "../../resources/icon.png?asset";
import { updateElectronApp } from "update-electron-app";

import type {
  GetHistoriesFn,
  GetFileContentFn,
  WriteHistoryFn,
  DeleteFileFn,
  GetDetectionTranslationResultFn,
  GetTranslationResultFn,
  TextToSpeechFn,
  WriteModelConfigsFn,
  ReadModelConfigsFn,
  OnDragStartFn,
  SaveAsFileFn,
} from "@shared/types";
import {
  getDeepLFreeResult,
  getClaudeResult,
  writeHistory,
  getHistories,
  getFileContent,
  deleteFile,
  getOpenAIResult,
  textToSpeech,
  writeModelConfigs,
  readModelConfigs,
  onDragStart,
  saveAsFile,
} from "@/lib";

updateElectronApp();

function createWindow(): void {
  // Create the browser window.
  const icon = nativeImage.createFromPath(iconPath);
  icon.setTemplateImage(true);
  // const tray = new Tray(nativeImage.createFromPath(iconPath));
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 850,
    minWidth: 800,
    minHeight: 600,
    show: false,
    // autoHideMenuBar: true,
    icon: icon,
    vibrancy: "under-window",
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 18, y: 20 },
    // ...(process.platform === "linux"
    // ? { icon }
    // : { icon: join(__dirname, "resources", "icon.icns") }),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: true,
      contextIsolation: true,
    },
  });

  app.dock.setIcon(icon);

  // mainWindow.webContents.openDevTools({ mode: "detach" });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPCs
  // curd ipcs
  ipcMain.handle("getDeepLFreeResult", (_, ...args: Parameters<GetDetectionTranslationResultFn>) =>
    getDeepLFreeResult(...args)
  );
  ipcMain.handle("getClaudeResult", (_, ...args: Parameters<GetTranslationResultFn>) =>
    getClaudeResult(...args)
  );
  ipcMain.handle("getOpenAIResult", (_, ...args: Parameters<GetTranslationResultFn>) =>
    getOpenAIResult(...args)
  );
  ipcMain.handle("textToSpeech", (_, ...args: Parameters<TextToSpeechFn>) => textToSpeech(...args));
  // fs ipcs
  ipcMain.handle("writeModelConfigs", (_, ...args: Parameters<WriteModelConfigsFn>) =>
    writeModelConfigs(...args)
  );
  ipcMain.handle("readModelConfigs", (_, ...args: Parameters<ReadModelConfigsFn>) =>
    readModelConfigs(...args)
  );
  ipcMain.handle("writeHistory", (_, ...args: Parameters<WriteHistoryFn>) => writeHistory(...args));
  ipcMain.handle("getHistories", (_, ...args: Parameters<GetHistoriesFn>) => getHistories(...args));
  ipcMain.handle("getFileContent", (_, ...args: Parameters<GetFileContentFn>) =>
    getFileContent(...args)
  );
  ipcMain.handle("deleteFile", (_, ...args: Parameters<DeleteFileFn>) => deleteFile(...args));
  ipcMain.handle("onDragStart", (event, ...args: Parameters<OnDragStartFn>) =>
    onDragStart(event, ...args)
  );
  ipcMain.handle("saveAsFile", (_, ...args: Parameters<SaveAsFileFn>) => saveAsFile(...args));

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
