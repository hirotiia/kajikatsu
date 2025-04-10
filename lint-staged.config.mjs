import path from 'path';

const buildEslintCommand = (filenames) => {
  const filteredFiles = filenames
    .filter((f) => f.includes('/src/'))
    .map((f) => path.relative(process.cwd(), f));

  // srcディレクトリ内のファイルがない場合はスキップ
  if (filteredFiles.length === 0) {
    return 'echo "src/ 配下の対象ファイルが存在しなかったため、ESlintをスキップします。"';
  }

  return `next lint --no-cache --fix --file ${filteredFiles.join(' --file ')}`;
};

const buildSecretlintCommand = (filenames) => {
  if (filenames.length === 0) {
    return 'echo "シークレットリントのチェック対象ファイルはありません。"';
  }

  return `npx secretlint ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;
};

const config = {
  '*.{ts,tsx}': [buildEslintCommand, "bash -c 'npm run check-types'"],
  '**/*': buildSecretlintCommand,
};

export default config;
