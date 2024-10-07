import { cp, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXIST_ERROR_MESSAGE = 'FS operation failed';
const UNKNOWN_ERROR_MESSAGE = 'Something went wrong during copying';
const SUCCESS_MESSAGE = 'The folder has been copied';

const copy = async () => {
  const fromFolder = path.resolve(__dirname, 'files');
  const toFolder = path.resolve(__dirname, 'files_copy');

  const isExistFromFolder = await access(fromFolder)
    .then(() => true)
    .catch(() => false);

  const isExistToFolder = await access(toFolder)
    .then(() => true)
    .catch(() => false);

  if (!isExistFromFolder || isExistToFolder) {
    throw new Error(EXIST_ERROR_MESSAGE);
  }

  await cp(fromFolder, toFolder, { recursive: true })
    .then(() => {
      console.log(SUCCESS_MESSAGE);
    })
    .catch((err) => {
      console.log(err, UNKNOWN_ERROR_MESSAGE);
    });
};

await copy();
