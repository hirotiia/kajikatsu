import path from 'path';

const buildEslintCommand = (filenames) => {
  const files = filenames
    .filter((f) => f.includes('/src/'))
    .map((f) => path.relative(process.cwd(), f));

  if (files.length === 0) return '';

  return `next lint --fix --file ${files.join(' --file ')}`;
};

const config = {
  '*.{ts,tsx}': [buildEslintCommand, "bash -c 'npm run check-types'"],
  '**/*': 'secretlint --maskSecrets',
};

export default config;
