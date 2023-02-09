import * as cds from '@sap/cds';
import { writeFile } from 'fs/promises';

export default async function () {
  //load public hana model
  const model = await cds.load('db');

  //connect to hana db
  const db = await cds.connect.to('db', {
    model: model as any,
    kind: 'hana',
    credentials: (cds.env.requires as any)?.db?.credentials,
  });

  //get object list
  const OBJECTS = Object.keys(db.entities);
  const SCHEMA_NAME = 'SYS';

  // create filters
  const filters = {
    OBJECTS: {
      SCHEMA_NAME,
      OBJECT_TYPE: { in: ['TABLE', 'VIEW'] },
      OBJECT_NAME: { in: OBJECTS },
    },
    TABLES: {
      SCHEMA_NAME,
      TABLE_NAME: { in: OBJECTS },
    },
    TABLE_COLUMNS: {
      SCHEMA_NAME,
      TABLE_NAME: { in: OBJECTS },
    },
    VIEWS: {
      SCHEMA_NAME,
      VIEW_NAME: { in: OBJECTS },
    },
    VIEW_COLUMNS: {
      SCHEMA_NAME,
      VIEW_NAME: { in: OBJECTS },
    },
  };

  // for every entity
  for (const [entity, definiton] of Object.entries(db.entities)) {
    //read content
    const result = await db
      .read(definiton)
      // with applied filter
      .where(filters[entity] || {});

    //define CSV headers
    const headers = Object.values(definiton.elements)
      .filter((e) => e.kind === 'element')
      .map((e) => e.name);

    const csv = arrayOfObjectsToCSV(result, headers);

    //write file\
    await writeFile(`db/data/${entity}.csv`, csv);
  }
}

function arrayOfObjectsToCSV(array: any[], headers: string[]) {
  const sep = ';';
  let csv = headers.join(sep) + '\n';
  csv += array
    .map((row) => headers.map((header) => `"${row[header]}"`).join(sep))
    .join('\n');
  return csv;
}
