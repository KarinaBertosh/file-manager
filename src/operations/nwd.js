import { dirname, isAbsolute, resolve } from "path";
import fs from "fs";

export function up(path, rootDit) {
  if (path === rootDit) {
    return path;
  } else {
    const result = dirname(path);
    return result;
  }
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

export function ls(path) {
  let dirArr = [];
  let fileArr = [];

  fs.readdir(path, (err, files) => {
    if (err) console.log("Error");
    else {
      files.forEach((file) => {
        fs.stat(file, function (err, stats) {
          if (stats.isFile()) {
            fileArr.push(`${file}: file`);
          } else {
            dirArr.push(`${file}: directory`);
          }
          if (files[files.length - 1] === file) {
            dirArr.sort();
            fileArr.sort();
            const result = dirArr.concat(fileArr);
            console.log(result);
          }
        });
      });
    }
  });
}
