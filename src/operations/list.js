import fs from "fs/promises";

export async function ls(currentDir) {
  try {
    const fileInDir = await fs.readdir(currentDir, { withFileTypes: true });
    const result = [];
    fileInDir
      .sort((a, b) => a.isFile() - b.isFile())
      .filter((f) => !f.isSymbolicLink())
      .forEach((f) => {
        result.push(`${f.name}: ${f.isFile() ? "file" : "directory"} `);
      });
    console.log(result);
  } catch {
    console.log("Error: No such directory exists, or you are already in a file");
  }
}
