import readline from "readline";
import { cd, up } from "./operations/nwd.js";

export class App {
  constructor(initDir) {
    this.currentDir = initDir;
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
        this.currentDir = up(this.currentDir);
      }

      if (command.substr(0, 2) === "cd") {
        const path = command.slice(3);
        const result = await cd(path, this.currentDir);
        if (result !== undefined) {
          this.currentDir = result;
        }
      }
      
      this.showCurrentDirectory();
    });
  }

  showCurrentDirectory() {
    console.log(`You are currently in ${this.currentDir}`);
  }
}
