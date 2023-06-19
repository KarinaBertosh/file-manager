import readline from "readline";
import { cd, ls, up } from "./operations/nwd.js";

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

      this.showCurrentDirectory();
    });
  }

  showCurrentDirectory() {
    console.log(`You are currently in ${this.currentDir}`);
  }
}
