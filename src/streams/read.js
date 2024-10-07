import path from 'node:path';
import process from 'node:process';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const fileToRead = path.resolve(__dirname, 'files', 'fileToRead.txt');
  const readableStream = createReadStream(fileToRead, 'utf8');

  readableStream.pipe(process.stdout);

  readableStream.on('end', () => {
    console.log('');
  });
};

await read();
