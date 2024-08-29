import { TargetConfiguration, readJsonFile } from '@nx/devkit';
import * as path from 'path';
import { PackageJson } from 'type-fest';

//const root: PackageJson = readJsonFile('package.json');

export const projectFilePatterns = ['project.json'];
export function registerProjectTargets(
  projectFilePath: string
): Record<string, TargetConfiguration> | undefined {
  //console.log(projectFilePath);

  const dirname = path.dirname(projectFilePath);

  //read package.json
  //onst cwd = dirname(projectFilePath);
  const pkg: PackageJson = readJsonFile(
    path.resolve(projectFilePath, '../package.json')
  );

  // ignore private packages;
  if (pkg.private) {
    return;
  }

  //
  const root: PackageJson = readJsonFile(
    path.resolve(projectFilePath).replace(projectFilePath, 'package.json')
  );

  const config = {
    version: {
      executor: 'nx:run-commands',
      options: {
        command: 'npm version',
        cwd: `${dirname}`,
      },
    },
  };

  if (pkg.version === root.version) {
    const commands: string[] = [];

    const renameTsBin = function (bin: string, path: string) {
      const ts = /\.ts$/;
      if (ts.test(path)) {
        const newPath = path.replace(ts, '.js');
        commands.push(`echo "Setting ${bin} to ${newPath}"`);
        // rename bin reference in a build folder
        commands.push(`npm pkg set ${bin}=${newPath}`);
        commands.push(`echo "Changing shebang in ${newPath} to node"`);
        // replace ts-node shebang with a node command
        commands.push(`npx set-shebang ${newPath} node`);
      }
    };

    // process typescript files
    if (pkg.bin) {
      if (typeof pkg.bin === 'string') {
        renameTsBin('bin', pkg.bin);
      } else {
        Object.entries(pkg.bin).forEach(
          ([bin, path]) => path && renameTsBin(`bin.${bin}`, path)
        );
      }
    }

    // inherit version
    commands.push('npm publish --access public');

    Object.assign(config, {
      publish: {
        executor: 'nx:run-commands',
        options: {
          commands,
          cwd: `dist/${dirname}`,
        },
        dependsOn: ['build'],
      },
    });
  }

  return config;
}
