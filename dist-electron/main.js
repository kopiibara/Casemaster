import { app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
const require2 = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
const { screen } = require2("electron");
function createWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = Math.round(screenWidth * 0.7);
  const windowHeight = Math.round(screenHeight * 0.8);
  win = new BrowserWindow({
    width: windowWidth,
    // Dynamic width
    height: windowHeight,
    // Dynamic height
    center: true,
    // Center the window on the screen
    titleBarStyle: "hidden",
    // Hide the title bar
    titleBarOverlay: {
      // Customize the title bar
      color: "#F6F9FF",
      symbolColor: "#000000"
    },
    icon: path.join(process.env.VITE_PUBLIC, "logo-white.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    },
    minWidth: Math.round(screenWidth * 0.6),
    // Minimum width: 60% of screen width
    minHeight: Math.round(screenHeight * 0.7),
    // Minimum height: 60% of screen height
    maxWidth: screenWidth,
    // Maximum width: 100% of screen width
    maxHeight: screenHeight
    // Maximum height: 100% of screen height
  });
  win.removeMenu();
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
