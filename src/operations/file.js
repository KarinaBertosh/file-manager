import { isAbsolute, resolve } from "path";
import fs from "fs";
import process from "process";

let file;

const checkFileExist = (path, currentDir) => {
  if (isAbsolute(path)) {
    file = path;
  } else {
    const currentPath = resolve(currentDir, path);
    file = currentPath;
  }
};

export async function cat(path, currentDir) {
  checkFileExist(path, currentDir);
  let reader = new fs.createReadStream(file);
  reader.pipe(process.stdout);
  const checkErrors = new Promise((resolve, reject) => {
    reader.on("end", () => resolve());
    reader.on("error", () => console.log("File not read"));
  });
  await checkErrors;
}

export async function add(path, currentDir) {
  checkFileExist(path, currentDir);
  let writer = fs.createWriteStream(file);
  const checkErrors = new Promise((resolve, reject) => {
    writer.on("end", () => resolve());
    writer.on("error", () => console.log("File not created"));
  });
  await checkErrors;
}

export function rn(path, currentDir, newFile) {
  checkFileExist(path, currentDir);

  if (fs.existsSync(file) && !fs.existsSync(newFile)) {
    fs.rename(file, newFile, () => {
      console.log("File Renamed!");
    });
  } else {
    const err = new Error("FS operation failed");
    return console.log("File not rename");
  }
}
