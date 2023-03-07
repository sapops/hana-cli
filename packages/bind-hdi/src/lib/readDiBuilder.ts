import {exec} from "node:child_process";
import { promisify } from "node:util";
import {readFile, unlink} from "node:fs/promises";
import { XsaEnv } from "./XSAtypes";

const tmpFile = "./di-builder.json";

const execAsync = promisify(exec);

export async function readDiBuilderJson() {
  await execAsync(`xs env di-builder --export-json=${tmpFile}`);
  const json = await readFile(tmpFile, "utf-8");
  await unlink(tmpFile);
  // console.log(`successfully deleted ${tmpFile}`);
  return JSON.parse(json) as XsaEnv;
}
