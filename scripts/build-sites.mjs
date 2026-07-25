import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const distDir = join(root, "dist");
const clientDir = join(distDir, "client");
const serverDir = join(distDir, "server");

await rm(distDir, { force: true, recursive: true });
await mkdir(serverDir, { recursive: true });
await cp(outDir, clientDir, { recursive: true });

const worker = `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
`;

await writeFile(join(serverDir, "index.js"), worker, "utf8");
console.log("Staged static portfolio for Sites.");
