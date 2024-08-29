const baseConfig = require('../../eslint.config.js');

const jsonc = require('jsonc-eslint-parser');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {},
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsonc,
    },
    rules: {
      '@nx/dependency-checks': 'error',
    },
  },
  {
    files: ['./package.json', './generators.json'],
    languageOptions: {
      parser: jsonc,
    },
    rules: {
      '@nx/nx-plugin-checks': 'error',
    },
  },
];
