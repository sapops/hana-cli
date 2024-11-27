import { Command } from 'commander';
import { writeFile } from 'fs/promises';
import { stdout } from 'process';
import { Case, convertCSN } from './lib/convertCSN';
import { hana2csn } from './lib/hana2csn';
import { env } from 'node:process';

interface Options {
  schema?: string;
  service?: string;
  namespace?: string;
  filter?: string;
  output?: string;
  case?: Case;
  prefix?: string;
}

export default new Command()
  .description('Generates CDS model from Hana table/view defintion')
  .option('--service <service>', 'HDI service name')
  .option('-s, --schema <schema>', 'Database schema')
  .option('-n, --namespace <namespace>', 'CDS namespace')
  .option('-f, --filter <filter>', 'Comma-separated list of tables/views')
  .option('-o, --output <output>', 'Name of output file (STDOUT by default)')
  .option(
    '-c, --case <properties case>',
    'Convert properties to a specific case',
  )
  .option('-p, --prefix <projection prefix>', 'Prefix for projection names')
  .action(async (options: Options) => {
    const useTTY = !options.output;
    const { write } = stdout;

    // if we want to use TTY we need to prevent all nested code to write anything to output
    if (useTTY) {
      stdout.write = () => {
        return true;
      };
    }
    if (options.service) {
      env['CDS_REQUIRES_DB_VCAP_NAME'] = options.service;
    }

    // generate CSN model
    const csn = await hana2csn({
      schema: options.schema,
      objects: options?.filter?.split(','),
      namespace: options?.namespace,
      prefix: options?.prefix,
    });

    if (options?.case && csn.definitions) {
      try {
        const csnConverted = await convertCSN(csn, {
          properties: { case: options?.case },
        });
        Object.assign(csn.definitions, csnConverted.definitions);
      } catch (error) {
        console.error(error);
      }
    }

    const result = JSON.stringify(csn, null, '\t');

    if (useTTY) {
      stdout.write = write;
      stdout.write(result);
    } else if (options?.output) {
      await writeFile(options?.output, result);
    }
  });

export * from './lib/hana2csn';
