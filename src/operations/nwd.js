import { dirname, isAbsolute, resolve } from "path";
import fs from "fs";

let file;

const checkFileExist = (path, currentDir) => {
  if (isAbsolute(path)) {
    file = path;
  } else {
    const currentPath = resolve(currentDir, path);
    file = currentPath;
  }
};

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

export async function ls(currentDir) {
  let dirArr = [];
  let fileArr = [];

  if (fs.existsSync(currentDir)) {
    fs.readdir(currentDir, (err, files) => {
      if (err)
        console.log("Error: No such directory exists, or you are in a file");
      else {
        files.forEach((f) => {
          fs.lstat(f, function (err, stats) {
            if (stats.isFile()) {
              fileArr.push(`${f}: file`);
            } else {
              dirArr.push(`${f}: directory`);
            }
            if (files[files.length - 1] === f) {
              dirArr.sort();
              fileArr.sort();
              console.log(dirArr.concat(fileArr));
            }
          });
        });
      }
    });
  } else {
    console.log("0, Error: No such directory exists, or you are in a file");
  }
}
