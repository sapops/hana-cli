import { Tree } from '@nx/devkit';
import { SysgenGeneratorSchema } from './schema';
import { compile } from '@sap/cds';

export async function sysgenGenerator(
  tree: Tree,
  options: SysgenGeneratorSchema
) {
  const { hana2csn } = await import('hana2cds');

  const { name } = options;

  console.log(`Reading ${name} object`);

  // object name may come in a format SCHEMA_NAME.OBJECT_NAME
  // so we need to split it
  let [SCHEMA_NAME, OBJECT_NAME] = name.split('.');

  // if schema name is not provided ( only object name ) - schema name must be PUBLIC
  if (!OBJECT_NAME) {
    OBJECT_NAME = SCHEMA_NAME;
    SCHEMA_NAME = 'PUBLIC';
  }

  //if object name is * then we need to select all objects
  //in this case objects can be empty
  const csn = await hana2csn({
    schema: SCHEMA_NAME,
    objects: OBJECT_NAME === '*' ? undefined : [OBJECT_NAME],
  });

  const cdl = compile.to.cdl(csn, { docs: true });

  console.log(cdl.toString());
}

export default sysgenGenerator;
