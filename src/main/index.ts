import { app, shell, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";

import type {
  GetClaudeResultFn,
  GetDeepLFreeResultFn,
  GetHistoriesFn,
  GetFileContentFn,
  ReadAPIsFn,
  WriteAPIsFn,
  WriteHistoryFn,
  DeleteFileFn,
} from "@shared/types";
import {
  readApis,
  writeApis,
  getDeepLFreeResult,
  getClaudeResult,
  writeHistory,
  getHistories,
  getFileContent,
  deleteFile,
} from "@/lib";

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 850,
    minWidth: 800,
    minHeight: 600,
    show: false,
    // autoHideMenuBar: true,
    vibrancy: "under-window",
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 18, y: 20 },
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: true,
      contextIsolation: true,
    },
  });

  mainWindow.webContents.openDevTools({ mode: "detach" });

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
  ipcMain.handle("readApis", (_, ...args: Parameters<ReadAPIsFn>) => readApis(...args));
  ipcMain.handle("writeApis", (_, ...args: Parameters<WriteAPIsFn>) => writeApis(...args));
  ipcMain.handle("getDeepLFreeResult", (_, ...args: Parameters<GetDeepLFreeResultFn>) =>
    getDeepLFreeResult(...args)
  );
  ipcMain.handle("getClaudeResult", (_, ...args: Parameters<GetClaudeResultFn>) =>
    getClaudeResult(...args)
  );
  // fs ipcs
  ipcMain.handle("writeHistory", (_, ...args: Parameters<WriteHistoryFn>) => writeHistory(...args));
  ipcMain.handle("getHistories", (_, ...args: Parameters<GetHistoriesFn>) => getHistories(...args));
  ipcMain.handle("getFileContent", (_, ...args: Parameters<GetFileContentFn>) =>
    getFileContent(...args)
  );
  ipcMain.handle("deleteFile", (_, ...args: Parameters<DeleteFileFn>) => deleteFile(...args));

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
