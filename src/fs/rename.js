import { rename as renaming, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXIST_ERROR_MESSAGE = 'FS operation failed';
const UNKNOWN_ERROR_MESSAGE = 'Something went wrong during renaming';
const SUCCESS_MESSAGE = 'The file has been renamed';

const rename = async () => {
  const fromFile = path.resolve(__dirname, 'files', 'wrongFilename.txt');
  const toFile = path.resolve(__dirname, 'files', 'properFilename.md');

  const isExistFromFile = await access(fromFile)
    .then(() => true)
    .catch(() => false);

  const isExistToFile = await access(toFile)
    .then(() => true)
    .catch(() => false);

  if (!isExistFromFile || isExistToFile) {
    throw new Error(EXIST_ERROR_MESSAGE);
  }

  await renaming(fromFile, toFile)
    .then(() => {
      console.log(SUCCESS_MESSAGE);
    })
    .catch((err) => {
      console.log(err, UNKNOWN_ERROR_MESSAGE);
    });
};

await rename();
