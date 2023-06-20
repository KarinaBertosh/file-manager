import { isAbsolute, resolve } from "path";
import { createBrotliCompress, createBrotliDecompress, createGzip } from "zlib";
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

export function compress(path, currentDir, newFile) {
  checkFileExist(path, currentDir);

  if (fs.existsSync(file)) {
    const readStream = fs.createReadStream(file);
    const writeStream = fs.createWriteStream(newFile);
    readStream.pipe(createBrotliCompress()).pipe(writeStream);
  } else {
    console.log("No such file exists");
  }
}

export function decompress(path, currentDir, newFile) {
  checkFileExist(path, currentDir);

  if (fs.existsSync(file)) {
    const readStream = fs.createReadStream(file);
    const writeStream = fs.createWriteStream(newFile, { encoding: "binary" });
    readStream.pipe(createBrotliDecompress()).pipe(writeStream);
  } else {
    console.log("No such file exists");
  }
}
