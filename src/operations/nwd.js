import { dirname, isAbsolute, resolve } from "path";
import fs from "fs";

export function up(path) {
  const result = dirname(path);
  return result;
}

export function cd(command, currentDir) {
  let path;
  if (isAbsolute(command)) {
    path = command;
  } else {
    const currentPath = resolve(currentDir, command);
    path = currentPath;
  }
  try {
    if (fs.existsSync(path)) {
      return `${path}`;
    }
  } catch (err) {
    return "error";
  }
}
