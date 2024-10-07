import os from 'node:os';
import { Worker } from 'node:worker_threads';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const systemCpuCores = os.cpus();
  const workersNumber = systemCpuCores.length;
  const workerFile = path.resolve(__dirname, 'worker.js');
  const result = [];

  for (let i = 0, workerData = 10; i < workersNumber; i++, workerData++) {
    const worker = new Worker(workerFile, { workerData });
    const promise = new Promise((resolve) => {
      worker.on('message', (data) => {
        resolve({
          status: 'resolved',
          data,
        });
      });

      worker.on('error', () => {
        resolve({
          status: 'error',
          data: null,
        });
      });
    });

    result.push(promise);
  }

  Promise.all(result).then(console.log);
};

await performCalculations();
