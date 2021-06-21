module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-tabs': 'off',
    'no-console': 'off',
    indent: 'off',
  },
  settings: {
    'import/resolver': {
        node: {
          extensions: ['.ts'],
        },
    },
    'import/extensions': {
        node: {
          extensions: ['.ts'],
        },
    },
  },
};
