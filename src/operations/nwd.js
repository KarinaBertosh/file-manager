import { dirname } from "path";
import fs from "fs";
import { checkFileExist, file } from "./general.js";

export function up(path, currentDir) {
  if (path === currentDir) {
    console.log("Error: You are in the root folder");
    return path;
  } else {
    const result = dirname(path);
    return result;
  }
}

export function cd(path, currentDir) {
  checkFileExist(path, currentDir);
  if (fs.existsSync(file)) {
    return `${file}`;
  } else console.log("Error: No such file exists");
}


