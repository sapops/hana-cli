# Set up local environment
- Install all dependencies using `npm install`
- For remote access generate hana secrets as described [here](packages/hana2cds/README.md)
- Persist Hana data in csv files using `npm run init:data`. This step will generated needed files in `db/data` folder
- Deploy model to sqlite from csv files using `npm run init:sqlite`
- now you can run unit test with mock data `nx test hana2cds`