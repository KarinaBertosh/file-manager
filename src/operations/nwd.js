import { dirname } from "path";
import fs from "fs";
import { checkFileExist, file } from "./general.js";

export function up(path, currentDir) {
  if (arguments) {
    if (path === currentDir) {
      console.log("Error: You are in the root folder");
      return path;
    } else {
      const result = dirname(path);
      return result;
    }
  } else {
    console.log("Error: not received all arguments");
  }
}

export function cd(path, currentDir) {
  if (arguments) {
    checkFileExist(path, currentDir);
    if (fs.existsSync(file)) {
      return `${file}`;
    } else console.log("Error: No such file exists");
  } else {
    console.log("Error: not received all arguments");
  }
}
