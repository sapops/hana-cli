/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cds from '@sap/cds';
import { CSN, Definition } from '@sap/cds/apis/csn';
import { getCdsType } from './hana2cdsType';
import * as Types from '../cds/SYS';
import path = require('path');

import { Service } from '@sap/cds/apis/services';

interface SingleInput {
  schema: string;
  objects?: string[];
  namespace?: string;
  prefix?: string;
}

interface CDSEnv {
  db: {
    credentials: any;
  };
}

export async function db2csn(db: Service, input: SingleInput): Promise<CSN> {
  const { OBJECTS } = db.entities('');

  // read table/view columns
  const result = (await db
    .read(OBJECTS)
    .columns((o: any) => {
      o.OBJECT_TYPE, o.OBJECT_OID, o.SCHEMA_NAME, o.OBJECT_NAME;
      // read view columns
      o.view((v: any) => {
        v('*'), v.columns('*');
      }),
        //read table columns
        o.table((v: any) => {
          v('*'), v.columns('*'), v.keys('*');
        });
    })
    .where(
      Object.assign(
        { SCHEMA_NAME: input?.schema },
        { OBJECT_TYPE: { in: ['TABLE', 'VIEW'] } },
        input?.objects && { OBJECT_NAME: { in: input.objects } }
      )
    )) as Types.OBJECTS[];

  type ObjectType = 'table' | 'view';

  // convert Hana definition to CSN model
  return {
    namespace: input?.namespace,
    definitions: Object.fromEntries(
      // map objects to CSN
      result.map((r) => {
        const object = r?.[r.OBJECT_TYPE.toLowerCase() as ObjectType];
        const columns = object?.columns;

        let keys = [] as string[];

        switch (r.OBJECT_TYPE) {
          case 'TABLE':
            keys =
              (object as Types.TABLES).keys?.map((k) => k.COLUMN_NAME) || [];
            break;
          default:
            break;
        }

        return [
          `${input?.prefix || ''}${r.OBJECT_NAME}`,
          Object.assign(
            { '@cds.persistence.exists': true },
            {
              kind: 'entity',
              elements:
                columns &&
                Object.fromEntries(
                  columns
                    .sort((a, b) => a.POSITION - b.POSITION)
                    .map((c) => [
                      c.COLUMN_NAME,
                      Object.assign(
                        {} as any,
                        getCdsType(c),
                        keys.includes(c.COLUMN_NAME) && { key: true },
                        c.COMMENTS && { '@title': c.COMMENTS }
                      ),
                    ])
                ),
            } as Definition,
            object?.COMMENTS && { '@title': object.COMMENTS }
          ),
        ];
      })
    ),
  };
}

export async function hana2csn(input: SingleInput): Promise<CSN> {
  //load public hana model
  const model = await cds.load(path.resolve(__dirname, '../cds/public'));

  // connect to db using public model
  const db = await cds.connect.to('db', {
    model: model as any,
    kind: 'hana',
    credentials: (cds.env.requires as CDSEnv)?.db.credentials,
  });

  return db2csn(db, input);
}
