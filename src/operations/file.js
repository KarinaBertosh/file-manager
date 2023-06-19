import { isAbsolute, resolve } from "path";
import fs from "fs";
import process from "process";
import { rejects } from "assert";

export async function cat(path, currentDir) {
  let file;
  if (isAbsolute(path)) {
    file = path;
  } else {
    const currentPath = resolve(currentDir, path);
    file = currentPath;
  }
  let reader = new fs.createReadStream(file);
  reader.pipe(process.stdout);
  const checkErrors = new Promise((resolve, reject) => {
    reader.on("end", () => resolve());
    reader.on("error", () => console.log("File not found"));
  });
  await checkErrors;
}
