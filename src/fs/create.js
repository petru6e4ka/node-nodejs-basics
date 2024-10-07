import { writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_EXIST_ERROR_MESSAGE = 'FS operation failed';
const UNKNOWN_ERROR_MESSAGE = 'Something went wrong during creation';
const SUCCESS_MESSAGE = 'The file has been created';
const FILE_CONTENT = 'I am fresh and young';
const ENCODING = 'utf8';

const create = async () => {
  const pathToFile = path.resolve(__dirname, 'files', 'fresh.txt');

  const isExist = await access(pathToFile)
    .then(() => true)
    .catch(() => false);

  if (isExist) {
    throw new Error(FILE_EXIST_ERROR_MESSAGE);
  }

  await writeFile(pathToFile, FILE_CONTENT, ENCODING)
    .then(() => {
      console.log(SUCCESS_MESSAGE);
    })
    .catch(() => {
      console.log(UNKNOWN_ERROR_MESSAGE);
    });
};

await create();
