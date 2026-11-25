import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dirs = ['src', 'test'];
let errors = 0;
for (const d of dirs) {
  for (const file of readdirSync(d)) {
    if (!file.endsWith('.ts')) continue;
    const content = readFileSync(join(d, file), 'utf8');
    if (content.includes('console.log(')) {
      console.error(`Lint error: console.log found in ${d}/${file}`);
      errors++;
    }
    if (content.includes(': any')) {
      console.error(`Lint error: explicit 'any' found in ${d}/${file}`);
      errors++;
    }
  }
}
if (errors > 0) process.exit(1);
console.log('Lint passed (0 issues).');
