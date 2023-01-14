import * as cds from '@sap/cds';

export async function readTable() {
  const db = await cds.connect.to('db');
  const { TABLES } = db.entities('');

  const tables = await db.read(TABLES);


}
