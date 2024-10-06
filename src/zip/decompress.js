import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const archive = path.resolve(__dirname, 'files', 'archive.gz');
  const toFile = path.resolve(__dirname, 'files', 'fileToCompress.txt');
  const archiveStream = fs.createReadStream(archive);

  archiveStream.pipe(zlib.createUnzip()).pipe(fs.createWriteStream(toFile));
};

await decompress();
