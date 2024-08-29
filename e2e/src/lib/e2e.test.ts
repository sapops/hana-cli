import * as cds from '@sap/cds';

test('model loaded', async () => {
  const model = await cds.load('@e2e/hana2cds');
  expect(model).not.toBeNull();
});
