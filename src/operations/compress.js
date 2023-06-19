import { createReadStream, createWriteStream } from "fs";
import { isAbsolute, resolve } from "path";
import { createGzip } from "zlib";

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

  try {
    const handleStream = createReadStream(file);
    handleStream
      .pipe(createGzip())
      .pipe(createWriteStream(newFile))
      .on("finish", () => {
        console.log("Compression completed successfully");
      });
  } catch (err) {
    console.log("No such file exists");
  }
}

export function decompress(path, currentDir, newFile) {
  checkFileExist(path, currentDir);

  try {
    const unzip = zlib.createUnzip();
    const input = fs.createReadStream(file);
    const output = fs.createWriteStream(newFile, {
      encoding: "binary",
    });
    pipeline(input, unzip, output, (error) => {
      if (error) console.log(error);
    });
  } catch (err) {
    console.log("No such file exists");
  }
}
