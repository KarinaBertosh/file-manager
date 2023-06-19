import os from "os";

export function eol() {
  console.log(`EOL: ${JSON.stringify(os.EOL)}`);
}

export function cpus() {
  const cpus = os.cpus();
  const result = cpus.map((c) => ({
    model: c.model,
    clockRate: `${c.speed / 1000} GHx`,
  }));
  console.table(result);
}

export function arh() {
  console.log(`Architecture: ${JSON.stringify(os.arch())}`);
}

export function homedir() {
  console.log(`Home directory: ${JSON.stringify(os.homedir())}`);
}

export function getName() {
  console.log(`System user name: ${JSON.stringify(os.userInfo().username)}`);
}
