import * as cds from '@sap/cds';
import { writeFile } from 'fs/promises';
import { type csn } from '@sap/cds';

type kinds = csn.kinds | 'element';

//generate CSV files with remote data
export default async function () {
  //load public hana model (tables only)
  const model = await cds.load('hana2cds');

  const requires = cds.env.requires;

  //connect to hana db
  //delete requires?.db?.credentials?.database;

  const db = await cds.connect.to('db', {
    model: model as never,
    kind: 'hana',
    credentials: requires?.db?.credentials,
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
    INDEX_COLUMNS: {
      SCHEMA_NAME,
      TABLE_NAME: { in: OBJECTS },
    },
  };

  // for every entity
  for (const [entity, definiton] of Object.entries(db.entities)) {
    const filename = `db/data/${entity}.csv`;

    console.log(`Generating ${filename}`);
    //read content
    const result = await db
      .read(definiton)
      // with applied filter
      .where(filters[entity] || {});

    //define CSV headers
    const headers = Object.values(definiton.elements)
      .filter(
        (e) => (e.kind as kinds) === 'element' && e.type !== 'cds.Association'
      )
      .map((e) => e.name);

    const csv = arrayOfObjectsToCSV(result, headers);

    //write file\
    await writeFile(filename, csv);
  }
}

function arrayOfObjectsToCSV(array: unknown[], headers: string[]) {
  const sep = ';';
  let csv = headers.join(sep) + '\n';
  csv += array
    .map((row) => headers.map((header) => `"${row[header]}"`).join(sep))
    .join('\n');
  return csv;
}
