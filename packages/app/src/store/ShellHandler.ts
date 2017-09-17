import { remote } from "electron";
const { writeFile, readFileSync } = require("jsonfile");

export function save(spec) {
  return new Promise((resolve, reject) => {
    remote.dialog.showSaveDialog(
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
          writeFile(filename, spec, function(err) {
            if (!err) {
              resolve();
            } else {
              reject(err);
            }
          });
        }
      }
    );
  });
}

export function open() {
  const dialogOptions: any = {
    filters: [{ name: "JSON", extensions: ["json"] }]
  };

  return new Promise(resolve => {
    remote.dialog.showOpenDialog(dialogOptions, filename => {
      const content = readFileSync(filename[0]);
      resolve(content);
    });
  });
}
