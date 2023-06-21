import crypto from "crypto";
import fs from "fs";
import { checkFileExist, file } from "./general.js";

export function hash(path, currentDir) {
  if (arguments) {
    checkFileExist(path, currentDir);

    try {
      const text = fs.readFileSync(file);
      const hashNode = (val) =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve(crypto.createHash("sha256").update(val).digest("hex")),
            0
          )
        );

      hashNode(text).then(console.log);
    } catch (err) {
      console.log("Error: No such file exists");
    }
  } else {
    console.log("Error: not received all arguments");
  }
}
