import { TargetConfiguration, readJsonFile } from '@nrwl/devkit';
import { dirname, join } from 'path';
import { PackageJson } from 'type-fest';

export function registerProjectTargets(
  projectFilePath: string
): Record<string, TargetConfiguration> | undefined {
  //read package.json
  const cwd = dirname(projectFilePath);
  const pkg: PackageJson = readJsonFile(join(cwd, 'package.json'));

  // ignore private packages;
  if (pkg.private) {
    return;
  }

  const commands: string[] = [];

  const renameTsBin = function (bin: string, path: string) {
    const ts = /\.ts$/;
    if (ts.test(path)) {
      // rename bin reference in a build folder
      commands.push(`npm pkg set ${bin}, ${path.replace(ts, '.js')}`);
      // replace ts-node shebang with a node command
      commands.push('npx set-shebang ${path} node');
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

  commands.push('npm publish');

  return {
    publish: {
      executor: 'nx:run-commands',
      options: {
        commands,
        cwd,
      },
      dependsOn:["build"]
    },
  };
}
