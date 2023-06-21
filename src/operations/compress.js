import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { checkFileExist, file, isValidPath } from "./general.js";
import fs from "fs";

export function compress(path, currentDir, newFile) {
  checkFileExist(path, currentDir);

  if (fs.existsSync(isValidPath(currentDir, newFile))) {
    if (
      fs.existsSync(file) &&
      file.includes(".txt") &&
      newFile.includes(".gz")
    ) {
      const readStream = fs.createReadStream(file);
      const writeStream = fs.createWriteStream(newFile);
      readStream.pipe(createBrotliCompress()).pipe(writeStream);
    } else {
      console.log(
        `Error: No such file exists or The file must include ".txt" and new file must includes ".gz"`
      );
    }
  } else {
    console.log("Error: New file directory not found");
  }
}

export function decompress(path, currentDir, newFile) {
  checkFileExist(path, currentDir);

  if (fs.existsSync(isValidPath(currentDir, newFile))) {
    if (
      fs.existsSync(file) &&
      file.includes(".gz") &&
      newFile.includes(".txt")
    ) {
      const readStream = fs.createReadStream(file);
      const writeStream = fs.createWriteStream(newFile, { encoding: "binary" });
      readStream.pipe(createBrotliDecompress()).pipe(writeStream);
    } else {
      console.log(
        `Error: No such file exists or The new file must include ".txt" and file must includes ".gz"`
      );
    }
  } else {
    console.log("Error: New file directory not found");
  }
}
