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
    reader.on("error", () => console.log("File not found"));
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
