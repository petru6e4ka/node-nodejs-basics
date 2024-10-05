import { rm, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UNEXIST_ERROR_MESSAGE = 'FS operation failed';
const UNKNOWN_ERROR_MESSAGE = 'Something went wrong during deleting';
const SUCCESS_MESSAGE = 'The file has been deleted';

const remove = async () => {
  const pathToFile = path.resolve(__dirname, 'files', 'fileToRemove.txt');

  const isExist = await access(pathToFile)
    .then(() => true)
    .catch(() => false);

  if (!isExist) {
    throw new Error(UNEXIST_ERROR_MESSAGE);
  }

  await rm(pathToFile)
    .then(() => {
      console.log(SUCCESS_MESSAGE);
    })
    .catch(() => {
      console.log(UNKNOWN_ERROR_MESSAGE);
    });
};

await remove();
