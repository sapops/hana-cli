import {
  Tree,
} from '@nx/devkit';

import { SysgenGeneratorSchema } from './schema';
import * as cds from '@sap/cds';

export async function sysgenGenerator(
  tree: Tree,
  options: SysgenGeneratorSchema
) {

  const db = await cds.connect.to('db');

  console.log(db.entities);

  const { name } = options;

  
  

  //generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  //await formatFiles(tree);
}

export default sysgenGenerator;
