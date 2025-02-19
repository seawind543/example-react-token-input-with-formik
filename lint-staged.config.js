module.exports = {
  '{src,examples}/**/*.{ts,tsx}': [
    () => 'tsc --noEmit',
    'prettier --write',
    'eslint --cache --fix --max-warnings 0',
  ],
  '{src,examples}/**/*.{js,jsx}': [
    'prettier --write',
    'eslint --cache --fix --max-warnings 0',
  ],
  '{src,examples}/**/*.scss': [
    'prettier --write',
    'stylelint --fix --custom-syntax postcss-scss',
  ],
};
