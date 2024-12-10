import { app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import path from "node:path";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

const { screen } = require("electron");
function createWindow() {
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().workAreaSize;

  const windowWidth = Math.round(screenWidth * 0.7); // 80% of screen width
  const windowHeight = Math.round(screenHeight * 0.8); // 80% of screen height

  win = new BrowserWindow({
    width: windowWidth, // Dynamic width
    height: windowHeight, // Dynamic height
    center: true, // Center the window on the screen

    titleBarStyle: "hidden", // Hide the title bar
    titleBarOverlay: {
      // Customize the title bar
      color: "#F6F9FF",
      symbolColor: "#000000",
    },

    icon: path.join(process.env.VITE_PUBLIC, "logo-white.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },

    minWidth: Math.round(screenWidth * 0.6), // Minimum width: 60% of screen width
    minHeight: Math.round(screenHeight * 0.7), // Minimum height: 60% of screen height
    maxWidth: screenWidth, // Maximum width: 100% of screen width
    maxHeight: screenHeight, // Maximum height: 100% of screen height
  });

  win.removeMenu(); // Remove the menu

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
