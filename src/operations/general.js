import path, { isAbsolute, resolve } from "path";

export let file;

export const checkFileExist = (path, currentDir) => {
  if (isAbsolute(path)) {
    file = path;
  } else {
    const currentPath = resolve(currentDir, path);
    file = currentPath;
  }
};

export const isValidPath = (currentDir, newFile) => {
  const newPath = path.join(currentDir, newFile);
  const index = newPath.lastIndexOf(`\\`);
  const result = newPath.slice(0, index);
  return result;
};
