import fs from "fs";
import process from "process";
import { checkFileExist, file, isValidPath } from "./general.js";

export async function cat(path, currentDir) {
  checkFileExist(path, currentDir);

  let reader = fs.createReadStream(file);
  reader.pipe(process.stdout);
  const checkErrors = new Promise((resolve, reject) => {
    reader.on("end", () => resolve());
    reader.on("error", () =>
      console.log("Error: No such file exists and File not read")
    );
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

  if (fs.existsSync(isValidPath(currentDir, newFile))) {
    if (fs.existsSync(file) && !fs.existsSync(newFile)) {
      fs.rename(file, newFile, () => {
        console.log("File Renamed!");
      });
    } else {
      console.log("Error: No such file exists and File not rename");
    }
  } else {
    console.log("Error: New file directory not found");
  }
}

export async function cp(path, currentDir, newFile, unlink) {
  checkFileExist(path, currentDir);

  if (fs.existsSync(isValidPath(currentDir, newFile))) {
    if (
      fs.existsSync(file) &&
      file.includes(".txt") &&
      newFile.includes(".txt")
    ) {
      let reader = new fs.createReadStream(file, "utf-8");
      let writer = fs.createWriteStream(newFile);

      reader.on("data", function (chunk) {
        writer.write(chunk);
      });

      const checkErrorsReader = new Promise((resolve, reject) => {
        reader.on("end", () => resolve());
        reader.on("error", () =>
          console.log("Error: No such file exists and File not read")
        );
        writer.on("end", () => resolve());
        writer.on("error", () =>
          console.log("Error: No such file exists and File not created")
        );
      });
      await checkErrorsReader;
      if (unlink) {
        try {
          fs.unlinkSync(file);
        } catch (error) {
          console.log("Error: File not read an not created");
        }
      }
    } else {
      console.log(
        `Error: No such file exists and The file and new file must include ".txt"`
      );
    }
  } else {
    console.log("Error: New file directory not found");
  }
}

export async function mv(path, currentDir, newFile) {
  const unlink = true;
  cp(path, currentDir, newFile, unlink);
}

export async function rm(path, currentDir) {
  checkFileExist(path, currentDir);

  try {
    fs.unlinkSync(file);
    console.log("File deleted");
  } catch (error) {
    console.log("Error: No such file exists");
  }
}
