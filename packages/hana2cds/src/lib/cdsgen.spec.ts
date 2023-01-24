import * as cds from '@sap/cds';

import { db2csn } from './hana2csn'


describe('hana2csn', () => {
  test('Connect to sqlite', async () => {
    const db = await cds.connect.to("public");

    const csn = await db2csn(db, {schema: 'SYS'});


  }, 100000);
});
