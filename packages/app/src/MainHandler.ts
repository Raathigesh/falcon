import { BrowserWindow, ipcMain, dialog } from "electron";
const jsonfile = require("jsonfile");

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

  ipcMain.on("save", (event, arg) => {
    dialog.showSaveDialog(
      {
        filters: [
          {
            name: "Json",
            extensions: ["json"]
          }
        ]
      },
      filename => {
        if (filename) {
          jsonfile.writeFile(filename, arg.spec, function(err) {
            if (!err) {
              event.sender.send("onSaveSuccess", {
                name: arg.name,
                path: filename
              });
            }
          });
        }
      }
    );
  });

  ipcMain.on("loadPlugins", event => {
    //  event.sender.send("plugins", require("C:/plugins/custom"));
  });
}
