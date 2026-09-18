import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'src', 'index.js');
const output = path.join(root, 'dist', 'index.js');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const release = JSON.parse(fs.readFileSync(path.join(root, '.playhub-release.json'), 'utf8'));
if (pkg.version !== release.version) throw new Error('Release version mismatch');
const code = fs.readFileSync(source, 'utf8');
if (!code.includes(`const runtimeVersion = "${pkg.version}.1";`)) {
  throw new Error('Runtime revision does not match the release version');
}
execFileSync(process.execPath, ['--check', source], { stdio: 'inherit' });
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.copyFileSync(source, output);
console.log(`Built TrailerHero ${pkg.version}: src/index.js -> dist/index.js`);
