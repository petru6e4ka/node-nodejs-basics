import path from 'node:path';
import process from 'node:process';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const fileToWrite = path.resolve(__dirname, 'files', 'fileToWrite.txt');
  const fileWriter = fs.createWriteStream(fileToWrite);

  process.stdin.pipe(fileWriter);
};

await write();
