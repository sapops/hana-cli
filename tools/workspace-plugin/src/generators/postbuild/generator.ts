import {
  getProjects,
  readJsonFile,
  TargetConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit';

import { PostbuildGeneratorSchema } from './schema';
import { PackageJson } from 'type-fest';

export async function postbuildGenerator(
  tree: Tree,
  options: PostbuildGeneratorSchema
) {
  const projects = getProjects(tree);
  const project = projects.get(options.name);

  // only instert for now
  if (project.targets['postbuild']) {
    if (!options.force) {
      console.log(
        `Skipping postbuild for ${options.name} because it already has a postbuild target. If you still want to rewrite it, use the --force flag.`
      );
      return;
    }
  }

  const cwd = `dist/${project.root}`;

  const postbuild: TargetConfiguration<{
    commands: string[];
    cwd: string;
  }> = {
    executor: 'nx:run-commands',
    options: { commands: [], cwd },
    dependsOn: ['build'],
    outputs: ['{options.cwd}'],
  };

  const pkg: PackageJson = readJsonFile(project.root + '/package.json');

  if (pkg.bin) {
    if (typeof pkg.bin === 'string') {
      addRenameBinCommand('bin', pkg.bin);
    } else {
      for (const key in pkg.bin) {
        if (pkg.bin[key]) {
          addRenameBinCommand(`bin.${key}`, pkg.bin[key]);
        }
      }
    }
  }

  function addRenameBinCommand(key: string, value?: string) {
    if (value?.endsWith('.ts')) {
      const newPath = value.slice(0, -3) + '.js';

      postbuild.options?.commands?.push(
        `npm pkg set ${key}=${newPath}`,
        `npx set-shebang ${newPath} node`
      );
    }
  }

  if (postbuild.options?.commands.length) {
    project.targets['postbuild'] = postbuild;
    updateProjectConfiguration(tree, project.name, project);
  }
}

export default postbuildGenerator;
