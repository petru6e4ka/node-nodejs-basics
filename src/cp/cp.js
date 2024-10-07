import process from 'node:process';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const childProcFile = path.resolve(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const child = spawn('node', [childProcFile, ...args]);

  child.stdout.setEncoding('utf8');
  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

spawnChildProcess(['someArgument1', 'someArgument2']);
