import { Command } from 'commander';
import { hana2csn } from './lib/hana2csn';

interface Options {
  schema: string;
  filter: string;
}

export default new Command()
  .description('Generates CDS model from Hana table/view defintion')
  .requiredOption('--schema <schema>', 'Database schema')
  .option('--filter <filter>', 'Comma-separated list of tables/views')
  .option('--to <to>', 'Comma-separated list of tables/views')
  .action(async (options: Options) => {
    // generate CSN model
    const csn = await hana2csn({
      schema: options.schema,
      objects: options.filter.split(','),
    });

    process.stdout.write(JSON.stringify(csn));
  });
