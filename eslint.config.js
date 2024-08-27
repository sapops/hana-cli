const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const nxEslintPlugin = require('@nx/eslint-plugin');

const cdsPlugin = require('@sap/eslint-plugin-cds');
const jsonc = require('jsonc-eslint-parser');
const globals = require('globals');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { plugins: { '@nx': nxEslintPlugin } },
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsonc,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  { ignores: ['.nx', '**/generated/**'] },
  // ...cds.recommended,
  cdsPlugin.configs.recommended,
  {
    // Override for .cjs files
    files: ['**/*.cjs', '**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // Disable no-require-imports for .cjs files
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
    },
  },
];
