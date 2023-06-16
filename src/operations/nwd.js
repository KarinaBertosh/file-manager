const path = require("path");
const fs = require("fs");

function up(path) {
  return path.dirname(path);
}

const fileExists = (command) => {
  fs.stat(command, (error, stats) => {
    if (error) {
      console.log(`No such file or directory: ${command}`);
    } else {
      console.log(`You are currently in ${command}`);
    }
  });
};

function cd(command) {
  if (path.isAbsolute(command)) {
    fileExists(command);
  } else {
    const dirname = path.dirname(path.resolve(__dirname));
    const currentPath = path.resolve(dirname, command);
    fileExists(currentPath);
  }
}

module.exports = { up, cd };
