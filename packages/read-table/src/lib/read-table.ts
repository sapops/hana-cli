import * as cds from '@sap/cds';

export async function readTable() {
  const db = await cds.connect.to('db');
  const { TABLES, VIEWS } = db.entities('public');
}
