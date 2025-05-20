import path from 'path';

const escapeGlob = (f) => f.replace(/([*?[\]{}()!+@])/g, '\\$1');
const quote = (f) =>
  `"${escapeGlob(path.relative(process.cwd(), f)).replace(/(["$`\\])/g, '\\$1')}"`;

const buildEslintCommand = (filenames) => {
  const filteredFiles = filenames.filter((f) => f.includes('/src/')).map(quote);

  if (filteredFiles.length === 0) {
    return 'echo "src/ 配下の対象ファイルが存在しなかったため、ESlintをスキップします。"';
  }

  return `next lint --no-cache --fix --file ${filteredFiles.join(' --file ')}`;
};

const buildSecretlintCommand = (filenames) => {
  if (filenames.length === 0) {
    return 'echo "シークレットリントのチェック対象ファイルはありません。"';
  }

  return `npx secretlint ${filenames.map(quote).join(' ')}`;
};

const config = {
  '*.{ts,tsx}': [buildEslintCommand, "bash -c 'npm run check-types'"],
  '**/*': buildSecretlintCommand,
};

export default config;
