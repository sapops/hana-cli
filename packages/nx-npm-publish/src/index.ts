import { CreateNodesResultV2, CreateNodesV2, readJsonFile } from '@nx/devkit';
import { dirname } from 'path';
import { PackageJson } from 'type-fest';

export const createNodesV2: CreateNodesV2 = [
  '**/package.json',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (configFiles) =>
    Promise.all(
      configFiles.map(async (config) => {
        const root = dirname(config);

        const result: CreateNodesResultV2[number] = [
          root,
          {
            projects: {
              [root]: {
                targets: {},
              },
            },
          },
        ];

        const targets = result[1]?.projects?.[root]?.targets;

        const pkg: PackageJson = readJsonFile(config);

        // if pkg.bin is .ts file - we need to rename it to .js
        

        return result;
      })
    ),
];
