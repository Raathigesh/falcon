import { BrowserWindow, ipcMain } from "electron";

export default function initialize() {
  ipcMain.on("newWindow", (event, url) => {
    console.log(url);
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600
    });
    mainWindow.loadURL(url);
    mainWindow.webContents.openDevTools();
  });
}
