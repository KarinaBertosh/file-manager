import process from "process";
import { App } from "./app.js";

const userName = process.argv[process.argv.length - 1].toString().slice(11);
const initDir = process.cwd();

const greeting = () => {
  console.log(`Welcome to the File Manager, ${userName}!`);
};

greeting();

process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
);

const app = new App(initDir);
await app.start();
