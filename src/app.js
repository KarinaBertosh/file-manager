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

      if (nameCommand === ".exit") {
        process.exit();
      }

      if (nameCommand === "up") {
        this.currentDir = up(this.currentDir, this.rootDit);
      }

      if (nameCommand === "cd") {
        const result = cd(argOne, this.currentDir);
        if (result !== undefined) {
          this.currentDir = result;
        }
      }

      if (nameCommand === "ls") {
        ls(this.currentDir);
      }

      if (nameCommand === "cat") {
        cat(argOne, this.currentDir);
      }

      if (nameCommand === "add") {
        add(argOne, this.currentDir);
      }

      if (nameCommand === "rn") {
        rn(argOne, this.currentDir, argTwo);
      }

      if (nameCommand === "cp") {
        cp(argOne, this.currentDir, argTwo);
      }

      if (nameCommand === "mv") {
        mv(argOne, this.currentDir, argTwo);
      }

      if (nameCommand === "rm") {
        rm(argOne, this.currentDir);
      }

      if (nameCommand === "os" && argOne === "--EOL") {
        eol();
      }

      if (nameCommand === "os" && argOne === "--cpus") {
        cpus();
      }

      if (nameCommand === "os" && argOne === "--architecture") {
        arh();
      }

      if (nameCommand === "os" && argOne === "--homedir") {
        homedir();
      }

      if (nameCommand === "os" && argOne === "--username") {
        getName();
      }

      if (nameCommand === "hash") {
        hash(argOne, this.currentDir);
      }

      if (nameCommand === "compress") {
        compress(argOne, this.currentDir, argTwo);
      }

      if (nameCommand === "decompress") {
        decompress(argOne, this.currentDir, argTwo);
      }

      this.showCurrentDirectory();
    });
  }

  showCurrentDirectory() {
    console.log(`You are currently in ${this.currentDir}`);
  }
}
