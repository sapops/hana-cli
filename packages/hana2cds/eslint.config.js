const baseConfig = require('../../eslint.config.js');

module.exports = [
  {
    ignores: ['**/src/cds/**/*.ts', "@cds-models"],
  },
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
];
