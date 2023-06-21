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

      if (nameCommand === ".exit" && !argOne) {
        process.exit();
      } else if (nameCommand === "up" && !argOne) {
        this.currentDir = up(this.currentDir, this.rootDit);
      } else if (nameCommand === "cd" && argOne && !argTwo) {
        const result = cd(argOne, this.currentDir);
        if (result !== undefined) {
          this.currentDir = result;
        }
      } else if (nameCommand === "ls" && !argOne) {
        ls(this.currentDir);
      } else if (nameCommand === "cat" && argOne && !argTwo) {
        cat(argOne, this.currentDir);
      } else if (nameCommand === "add" && argOne && !argTwo) {
        add(argOne, this.currentDir);
      } else if (nameCommand === "rn" && argOne && argTwo && !argThree) {
        rn(argOne, this.currentDir, argTwo)
      } else if (nameCommand === "cp" && argOne && argTwo && !argThree) {
        cp(argOne, this.currentDir, argTwo)
      } else if (nameCommand === "mv" && argOne && argTwo && !argThree) {
        mv(argOne, this.currentDir, argTwo)
      } else if (nameCommand === "rm" && argOne && !argTwo) {
        rm(argOne, this.currentDir)
      } else if (nameCommand === "os" && argOne === "--EOL" && !argTwo) {
        eol();
      } else if (nameCommand === "os" && argOne === "--cpus" && !argTwo) {
        cpus();
      } else if (
        nameCommand === "os" &&
        argOne === "--architecture" &&
        !argTwo
      ) {
        arh();
      } else if (nameCommand === "os" && argOne === "--homedir" && !argTwo) {
        homedir();
      } else if (nameCommand === "os" && argOne === "--username" && !argTwo) {
        getName();
      } else if (nameCommand === "hash" && argOne && !argTwo) {
        hash(argOne, this.currentDir)
      } else if (nameCommand === "compress" && argOne && argTwo && !argThree) {
        compress(argOne, this.currentDir, argTwo)
      } else if (nameCommand === "decompress" && argOne && argTwo && !argThree) {
        decompress(argOne, this.currentDir, argTwo)
      }

      this.showCurrentDirectory();
    });
  }

  showCurrentDirectory() {
    console.log(`You are currently in ${this.currentDir}`);
  }
}
