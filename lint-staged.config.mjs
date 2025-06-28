import path from 'path';

const buildNextLintCommand = (target) => (filenames) => {
  const prefix = `apps/${target}/src/`;
  const files = filenames
    .filter((f) => f.startsWith(prefix))
    .map((f) => path.relative(path.resolve(`apps/${target}`), f));

  if (files.length === 0) return '';

  return `cd apps/${target} && next lint --fix --file ${files.join(' --file ')}`;
};

const config = {
  '*.{ts,tsx}': [
    buildNextLintCommand('web'),
    buildNextLintCommand('mobile'),
    "bash -c 'npm run check-types'",
  ],
  '**/*': 'secretlint --maskSecrets',
};

export default config;
