import readline from "readline";
import process from "process";

const userName = process.argv[process.argv.length - 1].toString().slice(11);
console.log(`Welcome to the File Manager, ${userName}!`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  if (line === ".exit") {
    process.exit();
  }
});

process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
);
