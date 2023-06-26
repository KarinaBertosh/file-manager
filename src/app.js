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
      const argOne = arrCommand[1];
      const argTwo = arrCommand[2];
      const argThree = arrCommand[3];

      switch (true) {
        case nameCommand === ".exit" && !argOne:
          process.exit();
        case nameCommand === "up" && !argOne:
          this.currentDir = up(this.currentDir, this.rootDit);
          break;
        case nameCommand === "cd" && argOne && !argTwo:
          if (cd(argOne, this.currentDir) !== undefined) {
            this.currentDir = cd(argOne, this.currentDir);
          }
          break;
        case nameCommand === "ls" && !argOne:
          ls(this.currentDir);
          break;
        case nameCommand === "cat" && argOne && !argTwo:
          cat(argOne, this.currentDir);
          break;
        case nameCommand === "add" && argOne && !argTwo:
          add(argOne, this.currentDir);
          break;
        case nameCommand === "rn" && argOne && argTwo && !argThree:
          rn(argOne, this.currentDir, argTwo);
          break;
        case nameCommand === "cp" && argOne && argTwo && !argThree:
          cp(argOne, this.currentDir, argTwo);
          break;
        case nameCommand === "mv" && argOne && argTwo && !argThree:
          mv(argOne, this.currentDir, argTwo);
          break;
        case nameCommand === "rm" && argOne && !argTwo:
          rm(argOne, this.currentDir);
          break;
        case nameCommand === "os" && argOne === "--EOL" && !argTwo:
          eol();
          break;
        case nameCommand === "os" && argOne === "--cpus" && !argTwo:
          cpus();
          break;
        case nameCommand === "os" && argOne === "--architecture" && !argTwo:
          arh();
          break;
        case nameCommand === "os" && argOne === "--homedir" && !argTwo:
          homedir();
          break;
        case nameCommand === "os" && argOne === "--username" && !argTwo:
          getName();
          break;
        case nameCommand === "hash" && argOne && !argTwo:
          hash(argOne, this.currentDir);
          break;
        case nameCommand === "compress" && argOne && argTwo && !argThree:
          compress(argOne, this.currentDir, argTwo);
          break;
        case nameCommand === "decompress" && argOne && argTwo && !argThree:
          decompress(argOne, this.currentDir, argTwo);
          break;
      }

      this.showCurrentDirectory();
    });
  }

  showCurrentDirectory() {
    console.log(`You are currently in ${this.currentDir}`);
  }
}
