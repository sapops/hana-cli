/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cds from '@sap/cds';
import { getCdsType } from './hana2cdsType';

interface SingleInput {
  schema?: string;
  objects?: string[];
  namespace?: string;
  prefix?: string;
}

interface GetObjectsInput {
  SCHEMA_NAME?: string[];
  OBJECT_NAME?: string[];
}

async function getObjects(input: GetObjectsInput) {
  const { OBJECTS } = await import('./generated/types');

  //const result = await SELECT.from(OBJECTS);

  const result = await SELECT.from(OBJECTS, (o) => {
    o.OBJECT_TYPE, o.OBJECT_OID, o.SCHEMA_NAME, o.OBJECT_NAME;
    o.view &&
      o.view((v) => {
        v('*');
        v.columns!('*');
      });
    o.table &&
      o.table((t) => {
        t('*');
        t.columns!('*');
        t.keys!('*');
      });
  })
    .where({
      OBJECT_TYPE: { in: ['TABLE', 'VIEW'] },
      ...(input?.SCHEMA_NAME && { SCHEMA_NAME: { in: input?.SCHEMA_NAME } }),
      ...(input?.OBJECT_NAME && { OBJECT_NAME: { in: input?.OBJECT_NAME } }),
    })
    .orderBy('OBJECT_NAME');

  return result;
}

export async function db2csn(input: SingleInput): Promise<cds.csn.CSN> {

  let schema = input.schema;

  if (!schema) {
    schema = await cds.env.requires?.db?.['credentials']?.schema;
  }

  if (!schema) {
    throw new Error('No schema specified');
  }

  const result = await getObjects({
    SCHEMA_NAME: [schema],
    OBJECT_NAME: input.objects,
  });

  type ObjectType = 'table' | 'view';

  // convert Hana definition to CSN model
  return {
    namespace: input?.namespace,
    definitions: Object.fromEntries(
      // map objects to CSN
      result.map((r) => {
        const object = r?.[r.OBJECT_TYPE?.toLowerCase() as ObjectType];
        const columns = object?.columns;

        const keys = [] as string[];

        switch (r.OBJECT_TYPE) {
          case 'TABLE':
            r.table?.keys?.forEach(
              (k) => k.COLUMN_NAME && keys.push(k.COLUMN_NAME)
            );
            break;
          default:
            break;
        }

        return [
          `${input.prefix || ''}${r.OBJECT_NAME}`,
          Object.assign(
            { '@cds.persistence.exists': true },
            {
              kind: 'entity',
              elements:
                columns &&
                Object.fromEntries(
                  columns
                    .sort((a, b) => (a.POSITION ?? 0) - (b.POSITION ?? 0))
                    .map((c) => [
                      c.COLUMN_NAME ?? '',
                      Object.assign(
                        {} as any,
                        getCdsType(c),
                        keys.includes(c.COLUMN_NAME ?? '') && { key: true },
                        c.COMMENTS && { '@title': c.COMMENTS }
                      ),
                    ])
                ),
            } as cds.csn.Definition,
            object?.COMMENTS && { '@title': object.COMMENTS }
          ),
        ];
      })
    ),
  };
}

export async function hana2csn(input: SingleInput): Promise<cds.csn.CSN> {
  // connect to db using public model
  await cds.connect.to('db', {
    model: 'hana2cds',
  });
  return db2csn(input);
}
