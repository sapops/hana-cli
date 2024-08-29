import type { Config } from 'jest';
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  globalSetup: './jest.setup.ts',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    tsconfig: {
      module: 'ESNext',
      target: 'ESNext',
    },
    'ts-jest': {
      useESM: true,
    },
  },
} as Config;
