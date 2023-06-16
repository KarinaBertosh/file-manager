const readline = require("readline");
const process = require("process");
const {up, cd} = require("./operations/nwd");

const userName = process.argv[process.argv.length - 1].toString().slice(11);
const currentDirectory = process.cwd();
var showCurrentDirectory = (path) =>
  console.log(`You are currently in ${path}`);

const greeting = () => {
  console.log(`Welcome to the File Manager, ${userName}!`);
  showCurrentDirectory(currentDirectory);
};

greeting();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (command) => {
  if (command === ".exit") {
    process.exit();
  }
  if (command === "up") {
    showCurrentDirectory(up(currentDirectory));
  }
  if (command.substr(0, 2) === "cd") {
    cd(command.slice(3));
  }
});

process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
);
