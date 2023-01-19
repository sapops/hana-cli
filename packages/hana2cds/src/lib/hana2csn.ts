/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cds from '@sap/cds';
import { CSN, Definition, Element } from '@sap/cds/apis/csn';
import { getCdsType, HanaTypeDefinition } from './hana2cdsType';
import * as Types from '../cds/other';
import path = require('path');
//import model = require('../gen/csn.json');

interface SingleInput {
  schema: string;
  objects: string[];
}

interface CDSEnv {
  db: {
    credentials: any;
  };
}

export async function hana2csn(input: SingleInput): Promise<CSN> {

  //load public hana model
  const model = await cds.load(path.resolve(__dirname,'../cds/public'));

  // connect to db using public model
  const db = await cds.connect.to('db', {
    model: model as any,
    kind: 'hana',
    credentials: (cds.env.requires as CDSEnv)?.db.credentials,
  });

  const { OBJECTS } = db.entities('');

  // read table/view columns
  const result = (await db
    .read(OBJECTS)
    .columns((o: any) => {
      o.OBJECT_TYPE,
        o.OBJECT_OID,
        o.SCHEMA_NAME,
        o.OBJECT_NAME,
        //read view columns
        o.view((v: any) => {
          v('*'), v.columns('*');
        });
      //read table columns
      o.table((t: any) => {
        t('*'), t.columns('*');
      });
    })
    .where({
      SCHEMA_NAME: input.schema,
      OBJECT_NAME: { in: input.objects },
    })) as Types.OBJECTS[];

  type ObjectType = 'table' | 'view';

  // convert Hana definition to CSN model
  return {
    namespace: input.schema,
    definitions: Object.fromEntries(
      // map objects to CSN
      result.map((r) => {
        const object = r?.[r.OBJECT_TYPE.toLowerCase() as ObjectType];
        const columns = object?.columns;
        return [
          r.OBJECT_NAME,
          Object.assign({ '@cds.persistence.exists': true }, {
            kind: 'entity',
            elements:
              columns &&
              Object.fromEntries(
                columns.map((c) => [
                  c.COLUMN_NAME,
                  { type: getCdsType(c as HanaTypeDefinition) } as Element,
                ])
              ),
          } as Definition),
        ];
      })
    ),
  };
}
