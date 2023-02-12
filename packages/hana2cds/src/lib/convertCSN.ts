import { CSN, Definition, entity } from '@sap/cds/apis/csn';
import { SELECT } from '@sap/cds/apis/cqn';
import { strict as assert } from 'node:assert';

export type Case = 'snake' | 'camel' | 'pascal';

interface Options {
  properties?: {
    case?: Case;
  };
  entities?: {
    case?: Case;
    suffix?: string;
    prefix?: string;
  };
}

interface Projection {
  kind: 'entity';
  projection: SELECT['SELECT'];
}

export async function convertCSN(model: CSN, options: Options): Promise<CSN> {
  assert(model.definitions, 'Model definitions are not defined');

  // switch (options.case) {
  //   case 'snake':
  //     break;
  //   default:
  //     throw `Case convertion ${options.case} is not supported`;
  // }

  // const prefix = options?.entities?.prefix || 'views.';

  const definitions = Object.entries(model.definitions).reduce(
    (entries, [entity, definition]) => {
      const name = `${options?.entities?.prefix || `views.`}${entity.replace(
        /[^a-zA-Z0-9_]+/g,
        '.'
      )}${options?.entities?.suffix || ''}`;

      if (definition.kind === 'entity') {
        const projection: Projection = {
          kind: 'entity',
          projection: {
            from: {
              ref: [entity],
            },
            columns: Object.keys((definition as entity).elements).map((e) => {
              const ref = {
                ref: [e],
              };

              const as = applyCase(e, options?.properties?.case);

              as && as !== e && Object.assign(ref, { as });

              return ref;
            }),
          },
        };

        entries.push([name, projection as never]);
      }

      return entries;
    },
    [] as Array<[string, Definition]>
  );

  return {
    definitions: Object.fromEntries(definitions),
  };
}

function applyCase(e: string, c?: Case): string | void {
  switch (c) {
    case 'snake':
      return toSnakeCase(e);
  }
}

//convert Hana field names to a lower snake case
function toSnakeCase(str: string): string {
  return str
    .replace(/[A-Z]+/g, (match) => `_${match.toLowerCase()}`)
    .replace(/^_/, '')
    .replace(/__+/g, '_');
}
