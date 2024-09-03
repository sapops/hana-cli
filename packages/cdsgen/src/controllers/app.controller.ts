import { Cli, CliOption } from '@moostjs/event-cli';
import { Controller, Description } from 'moost';
import * as cds from '@sap/cds';
import type { csn } from '@sap/cds';
import { hdbsynonym } from './hana/synonym.js';
import { stdout } from 'process';
import { writeFile } from 'fs/promises';

type Annotatable<T> = T & {
  [key: string]: unknown;
};

@Controller()
export class AppController {
  @Cli('synonyms')
  async synonym(
    @CliOption('model')
    @Description('CDS model name')
    name: string,
    @CliOption('parseable')
    parseable?: boolean,
    @CliOption('output')
    output?: string
  ) {
    if (!parseable) {
      console.log(`Loading model: ${name}`);
    }

    const model = (await cds.load(name)) as {
      definitions: Record<string, Annotatable<csn.Definition>>;
    };

    const { constantCase } = await import('case-anything');
    const synonyms: hdbsynonym = {};

    for (const entity_key in model.definitions) {
      const entity = model.definitions[entity_key];
      if (entity.kind === 'entity' && entity['@cds.persistence.exists']) {
        const object = constantCase(entity_key);
        if (object !== entity_key) {
          synonyms[entity_key] = {
            target: {
              object,
            },
          };
        }
      }
    }

    const result = JSON.stringify(synonyms, null, '\t');
    if (parseable) {
      stdout.write(result);
    } else if (output) {
      await writeFile(output, result);
    } else {
      console.log('Generated synonyms:');
      console.log(result);
    }
  }
}
