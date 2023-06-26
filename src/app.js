import readline from "readline";
import { cd, up } from "./operations/nwd.js";
import { add, cat, cp, mv, rm, rn } from "./operations/file.js";
import { arh, cpus, eol, getName, homedir } from "./operations/os.js";
import { hash } from "./operations/hash.js";
import { compress, decompress } from "./operations/compress.js";
import { ls } from "./operations/list.js";

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
      const arrCommand = command.split(" ");
      const nameCommand = arrCommand[0];
      const firstArg = arrCommand[1];
      const secondArg = arrCommand[2];

      switch (true) {
        case nameCommand === ".exit" && arrCommand.length === 1:
          process.exit();
        case nameCommand === "up" && arrCommand.length === 1:
          this.currentDir = up(this.currentDir, this.rootDit);
          break;
        case nameCommand === "cd" && arrCommand.length === 2:
          if (cd(firstArg, this.currentDir) !== undefined) {
            this.currentDir = cd(firstArg, this.currentDir);
          }
          break;
        case nameCommand === "ls" && arrCommand.length === 1:
          ls(this.currentDir);
          break;
        case nameCommand === "cat" && arrCommand.length === 2:
          cat(firstArg, this.currentDir);
          break;
        case nameCommand === "add" && arrCommand.length === 2:
          add(firstArg, this.currentDir);
          break;
        case nameCommand === "rn" && arrCommand.length === 3:
          rn(firstArg, this.currentDir, secondArg);
          break;
        case nameCommand === "cp" && arrCommand.length === 3:
          cp(firstArg, this.currentDir, secondArg);
          break;
        case nameCommand === "mv" && arrCommand.length === 3:
          mv(firstArg, this.currentDir, secondArg);
          break;
        case nameCommand === "rm" && arrCommand.length === 2:
          rm(firstArg, this.currentDir);
          break;
        case nameCommand === "os" &&
          firstArg === "--EOL" &&
          arrCommand.length === 2:
          eol();
          break;
        case nameCommand === "os" &&
          firstArg === "--cpus" &&
          arrCommand.length === 2:
          cpus();
          break;
        case nameCommand === "os" &&
          firstArg === "--architecture" &&
          arrCommand.length === 2:
          arh();
          break;
        case nameCommand === "os" &&
          firstArg === "--homedir" &&
          arrCommand.length === 2:
          homedir();
          break;
        case nameCommand === "os" &&
          firstArg === "--username" &&
          arrCommand.length === 2:
          getName();
          break;
        case nameCommand === "hash" && arrCommand.length === 2:
          hash(firstArg, this.currentDir);
          break;
        case nameCommand === "compress" && arrCommand.length === 3:
          compress(firstArg, this.currentDir, secondArg);
          break;
        case nameCommand === "decompress" && arrCommand.length === 3:
          decompress(firstArg, this.currentDir, secondArg);
          break;
        default:
          console.log("Error: no such command exists");
      }

      this.showCurrentDirectory();
    });
  }

  showCurrentDirectory() {
    console.log(`You are currently in ${this.currentDir}`);
  }
}
