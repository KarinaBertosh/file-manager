import readline from "readline";
import { cd, up } from "./operations/nwd.js";

export class App {
  constructor(initDir) {
    this.currentDir = initDir;
  }

  showCurrentDirectory() {
    console.log(`You are currently in ${this.currentDir}`);
  }

  async start() {
    this.showCurrentDirectory();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", (command) => {
      if (command === ".exit") {
        process.exit();
      }
      if (command === "up") {
        console.log("up", up(this.currentDir));
        this.currentDir = up(this.currentDir);
        this.showCurrentDirectory();
      }
      if (command.substr(0, 2) === "cd") {
        cd(command.slice(3), this.currentDir);
        // this.currentDir = cd(command.slice(3), this.currentDir);
      }
    });
  }
}
