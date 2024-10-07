import { readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UNEXIST_ERROR_MESSAGE = 'FS operation failed';
const UNKNOWN_ERROR_MESSAGE = 'Something went wrong during reading';

const list = async () => {
  const pathToFolder = path.resolve(__dirname, 'files');

  const isExist = await access(pathToFolder)
    .then(() => true)
    .catch(() => false);

  if (!isExist) {
    throw new Error(UNEXIST_ERROR_MESSAGE);
  }

  await readdir(pathToFolder)
    .then((files) => {
      console.log(files);
    })
    .catch(() => {
      console.log(UNKNOWN_ERROR_MESSAGE);
    });
};

await list();
