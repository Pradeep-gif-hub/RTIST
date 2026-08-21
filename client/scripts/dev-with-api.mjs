import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const clientDirectory = path.resolve(scriptsDirectory, '..');
const serverDirectory = path.resolve(clientDirectory, '../server');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const server = spawn(npmCommand, ['run', 'dev'], {
  cwd: serverDirectory,
  env: process.env,
  stdio: 'inherit',
});

const client = spawn('vite', [], {
  cwd: clientDirectory,
  env: process.env,
  stdio: 'inherit',
});

let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  server.kill('SIGTERM');
  client.kill('SIGTERM');
  process.exit(exitCode);
}

server.on('error', () => shutdown(1));
client.on('error', () => shutdown(1));
server.on('exit', (code) => {
  if (!shuttingDown && code !== 0) shutdown(code || 1);
});
client.on('exit', (code) => {
  if (!shuttingDown && code !== 0) shutdown(code || 1);
});

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());