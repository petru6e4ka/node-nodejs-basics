import { createHash } from 'node:crypto';
import path from 'node:path';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const file = path.resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');
  const input = createReadStream(file);

  input.on('readable', () => {
    const data = input.read();

    if (data) {
      hash.update(data);
      console.log(data.toString('hex'));
    }
  });
};

await calculateHash();
