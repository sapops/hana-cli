import { Command } from '@commander-js/extra-typings';
import { readFile, writeFile } from 'fs/promises';

import merge from '@fastify/deepmerge';

import { filterDiBuilder } from './lib/filterDiBuilder';

export default new Command('bind-hdi')
  .requiredOption('-s, --service <container>', 'Source container to bind')
  .requiredOption('-a, --as <alias>', 'bind as..')
  .option('--target-container', 'as target container')
  .requiredOption('--to <json>', 'json file to update')
  .action(async (options) => {
    // new json
    const jsonNew = await filterDiBuilder({
      key: options.as,
      service: options.service,
    });
    // update file
    if (options.to) {
      let jsonOld = {};
      // read from existing file
      try {
        jsonOld = JSON.parse(await readFile(options.to, 'utf-8'));
      } catch (error) {
        //do nothing
      }
      const json = merge()(jsonOld, jsonNew);
      if (options.targetContainer) {
        json.TARGET_CONTAINER = options.service;
      }
      await writeFile(options.to, JSON.stringify(json, null, '\t'));
    }
  });

  
