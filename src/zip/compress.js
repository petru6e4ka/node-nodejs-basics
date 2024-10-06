import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const file = path.resolve(__dirname, 'files', 'fileToCompress.txt');
  const toArchive = path.resolve(__dirname, 'files', 'archive.gz');
  const fileStream = fs.createReadStream(file);

  fileStream.pipe(zlib.createGzip()).pipe(fs.createWriteStream(toArchive));
};

await compress();
