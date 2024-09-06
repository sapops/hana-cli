/**
 * Controller class for generating hdbsynonym files.
 */
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

    @CliOption('schema')
    @Description('Target schema')
    schema?: string,

    @CliOption('quoted')
    @Description('Use quuoted SQL mapping')
    quoted?: boolean,

    @CliOption('plain')
    @Description('Use plain SQL mapping')
    plain?: boolean,

    @CliOption('regex')
    @Description('Filter entities by regex')
    regex?: string
  ) {
    if (!parseable) {
      console.log(`Loading model: ${name}`);
    }

    const model = (await cds.load(name)) as {
      definitions: Record<string, Annotatable<csn.Definition>>;
    };

    const { constantCase } = await import('case-anything');

    const synonyms: hdbsynonym = {};

    function createSynonym(
      sql_mapping: 'quoted' | 'plain',
      entity_key: string
    ) {
      let synonym_key: string;

      switch (sql_mapping) {
        case 'quoted':
          // in a quoted mode CAP will replace entities like foo::bar to foo.bar
          synonym_key = entity_key.replace(/[^a-zA-Z0-9_]+/g, '.');
          break;
        case 'plain':
          synonym_key = constantCase(entity_key.toUpperCase());
          break;
        default:
          throw new Error(`Unknown sql_mapping: ${sql_mapping}`);
      }

      if (schema || synonym_key !== entity_key) {
        synonyms[synonym_key] = {
          target: {
            object: entity_key,
            ...(schema ? { schema } : {}),
          },
        };
      }
    }

    for (const entity_key in model.definitions) {
      const entity = model.definitions[entity_key];
      if (entity.kind === 'entity') {
        if (regex && !entity_key.match(regex)) {
          continue;
        }
        // it's ok to create both quoted and plain synonyms in the same file
        if (quoted) {
          createSynonym('quoted', entity_key);
        }
        if (plain) {
          createSynonym('plain', entity_key);
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
