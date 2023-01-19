import { hana2csn } from './hana2csn';

// describe('hana2cds', () => {
//   it('should work', () => {
//     expect(hana2cds()).toEqual('hana2cds');
//   });
// });

describe('hana2csn', () => {
  test('should work', async () => {
    const result = await hana2csn({ schema: 'SYS', objects: ['TABLES'] });
    console.log(result);
  }, 100000);
});
