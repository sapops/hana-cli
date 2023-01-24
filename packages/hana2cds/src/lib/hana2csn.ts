/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cds from '@sap/cds';
import { CSN, Definition } from '@sap/cds/apis/csn';
import { getCdsType } from './hana2cdsType';
import * as Types from '../cds/other';
import path = require('path');

import { Service } from '@sap/cds/apis/services';

interface SingleInput {
  schema: string;
  objects?: string[];
}

interface CDSEnv {
  db: {
    credentials: any;
  };
}

export async function db2csn(db: Service, input:SingleInput): Promise<CSN>  {

  const { OBJECTS } = db.entities('');

  const with_columns = (v: any) => {
    v('*'), v.columns('*');
  };

  // read table/view columns
  const result = (await db
    .read(OBJECTS)
    .columns((o: any) => {
      o.OBJECT_TYPE,
        o.OBJECT_OID,
        o.SCHEMA_NAME,
        o.OBJECT_NAME,
        //read view columns
        o.view(with_columns);
      //read table columns
      o.table(with_columns);
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
    namespace: input?.schema,
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
                columns
                  .sort((a, b) => a.POSITION - b.POSITION)
                  .map((c) => [c.COLUMN_NAME, getCdsType(c) as unknown])
              ),
          } as Definition),
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
