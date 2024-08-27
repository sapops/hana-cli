process.env['CDS_ENV'] = 'mock';

import { db2csn } from './hana2csn';
import { convertCSN } from './convertCSN';

describe('hana2csn', () => {
  test('Connect to sqlite', async () => {
    const schema = await db2csn({ schema: 'SYS' });

    expect(schema).toBeDefined();

    const views = await convertCSN(schema, { properties: { case: 'snake' } });

    expect(views).toBeDefined();
  }, 100000);
});
