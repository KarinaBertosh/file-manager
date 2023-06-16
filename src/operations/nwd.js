import { dirname, isAbsolute, resolve } from "path";
import fs from "fs";

export function up(path) {
  const result = dirname(path);
  return result;
}

const fileExists = (path) => {
  fs.stat(path, (error, stats) => {
    if (error) {
      console.log(`No such file or directory: ${path}`);
    } else {
      console.log(`You are currently in ${path}`);
      return path;
    }
  });
};

export function cd(command, currentDir) {
  if (isAbsolute(command)) {
    fileExists(command);
  } else {
    const currentPath = resolve(currentDir, command);
    fileExists(currentPath);
  }
}
