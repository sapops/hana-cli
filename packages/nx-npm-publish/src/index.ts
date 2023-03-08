import { TargetConfiguration, readJsonFile } from '@nrwl/devkit';
import * as path from 'path';
import { PackageJson } from 'type-fest';

//const root: PackageJson = readJsonFile('package.json');

export const projectFilePatterns = ['project.json'];
export function registerProjectTargets(
  projectFilePath: string
): Record<string, TargetConfiguration> | undefined {
  //console.log(projectFilePath);

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

  if (pkg.version !== root.version) {
    return;
  }

  const commands: string[] = [];

  const renameTsBin = function (bin: string, path: string) {
    const ts = /\.ts$/;
    if (ts.test(path)) {
      // rename bin reference in a build folder
      commands.push(`npm pkg set ${bin}=${path.replace(ts, '.js')}`);
      // replace ts-node shebang with a node command
      commands.push(`npx set-shebang ${path} node`);
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

  return {
    publish: {
      executor: 'nx:run-commands',
      options: {
        commands,
        cwd: `dist/${path.dirname(projectFilePath)}`,
      },
      dependsOn: ['build'],
    },
  };
}
