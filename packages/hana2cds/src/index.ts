import { Command } from 'commander';
import { writeFile } from 'fs/promises';
import { stdout } from 'process';
import { Case, convertCSN } from './lib/convertCSN';
import { hana2csn } from './lib/hana2csn';

interface Options {
  schema: string;
  namespace?: string;
  prefix?: string;
  filter?: string;
  output?: string;
  case?: Case;
}

export default new Command()
  .description('Generates CDS model from Hana table/view defintion')
  .requiredOption('-s, --schema <schema>', 'Database schema')
  .option('-n, --namespace <namespace>', 'CDS namespace')
  .option('-p, --prefix <prefix>', 'Prefix for cds entities')
  .option('-f, --filter <filter>', 'Comma-separated list of tables/views')
  .option('-o, --output <output>', 'Name of output file (STDOUT by default)')
  .option(
    '-c, --case <properties case>',
    'Convert properties to a specific case'
  )
  // .option('-n, --prefix <projection prefix>', 'Prefix for converted projections (applicable if case is provided)')
  .action(async (options: Options) => {
    const useTTY = !options.output;
    const { write } = stdout;

    // if we want to use TTY we need to prevent all nested code to write anything to output
    if (useTTY) {
      stdout.write = () => {
        return true;
      };
    }

    // generate CSN model
    const csn = await hana2csn({
      schema: options.schema,
      objects: options?.filter?.split(','),
      namespace: options?.namespace,
      prefix: options?.prefix
    });

    if (options?.case && csn.definitions) {
      try {
        const csnConverted = await convertCSN(csn, {
          properties: { case: options?.case },
        });
        Object.assign(csn.definitions, csnConverted.definitions);
      } catch (error) {
        //do nothing
      }
    }

    const result = JSON.stringify(csn, null, '\t');

    if (useTTY) {
      stdout.write = write;
      stdout.write(result);
    } else {
      options?.output && (await writeFile(options?.output, result));
    }
  });
