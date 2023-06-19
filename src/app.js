import readline from "readline";
import { cd, ls, up } from "./operations/nwd.js";
import { add, cat, rn } from "./operations/file.js";

export class App {
  constructor(initDir) {
    this.currentDir = initDir;
    this.rootDit = initDir;
  }

  async start() {
    this.showCurrentDirectory();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", async (command) => {
      if (command === ".exit") {
        process.exit();
      }

      if (command === "up") {
        this.currentDir = up(this.currentDir, this.rootDit);
      }

      if (command.substr(0, 2) === "cd") {
        const path = command.slice(3);
        const result = cd(path, this.currentDir);
        if (result !== undefined) {
          this.currentDir = result;
        }
      }

      if (command === "ls") {
        ls(this.currentDir);
      }

      if (command.substr(0, 3) === "cat") {
        cat(command.slice(4), this.currentDir);
      }

      if (command.substr(0, 3) === "add") {
        add(command.slice(4), this.currentDir);
      }

      if (command.substr(0, 2) === "rn") {
        const arrCommand = command.split(" ");
        rn(arrCommand[1], this.currentDir, arrCommand[2]);
      }

      this.showCurrentDirectory();
    });
  }

  showCurrentDirectory() {
    console.log(`You are currently in ${this.currentDir}`);
  }
}
