import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UNEXIST_ERROR_MESSAGE = 'FS operation failed';
const UNKNOWN_ERROR_MESSAGE = 'Something went wrong during reading';

const read = async () => {
  const pathToFile = path.resolve(__dirname, 'files', 'fileToRead.txt');

  const isExist = await access(pathToFile)
    .then(() => true)
    .catch(() => false);

  if (!isExist) {
    throw new Error(UNEXIST_ERROR_MESSAGE);
  }

  await readFile(pathToFile, { encoding: 'utf8' })
    .then((contents) => {
      console.log(contents);
    })
    .catch(() => {
      console.log(UNKNOWN_ERROR_MESSAGE);
    });
};

await read();
