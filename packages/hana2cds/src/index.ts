import { Command } from 'commander';
import { writeFile } from 'fs/promises';
import { stdout } from 'process';
import { hana2csn } from './lib/hana2csn';

interface Options {
  schema: string;
  filter: string;
  output: string;
}

export default new Command()
  .description('Generates CDS model from Hana table/view defintion')
  .requiredOption('--schema <schema>', 'Database schema')
  .option('--filter <filter>', 'Comma-separated list of tables/views')  
  .option('-o, --output <output>', 'Name of output file (STDOUT by default)')
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
    });

    const result = JSON.stringify(csn, null, '\t');

    if (useTTY) {
      stdout.write = write;
      stdout.write(result);
    } else {
      await writeFile(options.output, result);
    }
  });
