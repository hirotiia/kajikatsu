import path from 'path';

const buildEslintCommand = (filenames) => {
  return `next lint --no-cache --fix --file ${filenames
    .filter((f) => f.includes('/src/'))
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;
};

const config = {
  '*.{ts,tsx}': [buildEslintCommand, "bash -c 'npm run check-types'"],
  '**/*': 'npm run secretlint',
};

export default config;