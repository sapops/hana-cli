# Hana CLI

This project is supposed to be a monorepo CLI for multiple hana commands ( next-gen hana-cli ) where each of subcommands will be published also as a separate module.

# Commands

- [hana2cds](packages/hana2cds/README.md) CDS generator from Hana artifacts

# Set up local environment

- Install all dependencies using `npm install`

## Generate new System Data

- Login to your hana using `cf login`
- Bind this project to hana `cds bind --to hana` where `hana` is the name of your hana service instance
- Deploy project once and store credentials ( may be there is another way to store credentials without deployement) `cds deploy --store-credentials`
- Persist Hana data in csv files using `npm run init:data`. This step will generate/update csv files in `db/data` folder with needed data
- Deploy model to sqlite from csv files using `npm run init:sqlite`
- now you can run unit test with mock data `nx test hana2cds`
