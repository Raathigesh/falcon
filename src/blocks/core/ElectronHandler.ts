import { ipcRenderer } from "electron";

const Handler = {
  OpenNewWindow(url) {
    ipcRenderer.send("newWindow", url);
  }
};

export default Handler;
