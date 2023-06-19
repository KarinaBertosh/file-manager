import crypto from "crypto";
import fs from "fs";
import { isAbsolute, resolve } from "path";

let file;

const checkFileExist = (path, currentDir) => {
  if (isAbsolute(path)) {
    file = path;
  } else {
    const currentPath = resolve(currentDir, path);
    file = currentPath;
  }
};

export function hash(path, currentDir) {
  checkFileExist(path, currentDir);

  try {
    const text = fs.readFileSync(file);
    const hashNode = (val) =>
      new Promise((resolve) =>
        setTimeout(
          () => resolve(crypto.createHash("sha256").update(val).digest("hex")),
          0
        )
      );

    hashNode(text).then(console.log);
  } catch (err) {
    return console.log("No such file exists");
  }
}
