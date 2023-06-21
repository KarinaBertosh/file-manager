import fs from "fs";
import process from "process";
import { checkFileExist, file, isValidPath } from "./general.js";

export async function cat(path, currentDir) {
  if (arguments) {
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
  } else {
    console.log("Error: not received all arguments");
  }
}

export async function add(path, currentDir) {
  if (arguments) {
    checkFileExist(path, currentDir);

    let writer = fs.createWriteStream(file);
    const checkErrors = new Promise((resolve, reject) => {
      writer.on("end", () => resolve());
      writer.on("error", () => console.log("File not created"));
    });
    await checkErrors;
  } else {
    console.log("Error: not received all arguments");
  }
}

export function rn(path, currentDir, newFile) {
  if (arguments) {
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
  } else {
    console.log("Error: not received all arguments");
  }
}

export async function cp(path, currentDir, newFile, unlink) {
  if ((path, currentDir, newFile)) {
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
  } else {
    console.log("Error: not received all arguments");
  }
}

export async function mv(path, currentDir, newFile) {
  if (arguments) {
    const unlink = true;
    cp(path, currentDir, newFile, unlink);
  } else {
    console.log("Error: not received all arguments");
  }
}

export async function rm(path, currentDir) {
  if (arguments) {
    checkFileExist(path, currentDir);
    try {
      fs.unlinkSync(file);
      console.log("File deleted");
    } catch (error) {
      console.log("Error: No such file exists");
    }
  } else {
    console.log("Error: not received all arguments");
  }
}
