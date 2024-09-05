import { Cli, CliOption } from '@moostjs/event-cli';
import { Controller, Description } from 'moost';
import cds from '@sap/cds';
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
  @Description('Generate hdbsynonym file')
  async synonym(
    @CliOption('model')
    @Description('CDS model name')
    name: string,
    @CliOption('parseable')
    @Description('Parseable CLI output (JSON)')
    parseable?: boolean,
    @Description('Output file')
    @CliOption('output')
    output?: string,
    @CliOption('case')
    @Description('Synonym name format [snake|constant]')
    transform?: 'snake' | 'constant',
    @CliOption('schema')
    @Description('Target schema')
    schema?: string
  ) {
    if (!parseable) {
      console.log(`Loading model: ${name}`);
    }

    const model = (await cds.load(name)) as {
      definitions: Record<string, Annotatable<csn.Definition>>;
    };

    const { constantCase, snakeCase } = await import('case-anything');

    const transformers = {
      snake: snakeCase,
      constant: constantCase,
    };

    const transformer = transformers[transform || 'constant'];

    const synonyms: hdbsynonym = {};

    for (const entity_key in model.definitions) {
      const entity = model.definitions[entity_key];
      if (entity.kind === 'entity' && entity['@cds.persistence.exists']) {
        if (transformer) {
          const synonym_key = transformer(entity_key);
          if (schema || synonym_key !== entity_key) {
            synonyms[synonym_key] = {
              target: {
                object: entity_key,
                ...(schema ? { schema } : {}),
              },
            };
          }
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
