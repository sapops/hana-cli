# Convert Hana artifacts to CDS

Command line compiling CDS/CSN models from Hana artifacts

# Introduction

SAP CAP framework (https://cap.cloud.sap/) - is a framework by SAP which allows to design and build database artifacts using CDS language and also builds native database files, like for example .hdbtable/.hdbview for SAP Hana database. This is a target scenario for a new application. However very often we face another problem - when we need to build a model on top of existing database schema. In this case the table already exists and to be able to expose it as a service we need to have CDS representation

The idea behind this CLI is very simple - we connect to Hana database using native CAP service binding (https://cap.cloud.sap/docs/advanced/hybrid-testing) and then we generate CSN model as a result (https://cap.cloud.sap/docs/cds/csn)

This model may be later converted to CDS files by use of `cds compile --to cdl` command

## Usage
```
Usage: hana2cds [options]

Generates CSN model from Hana table/view defintion

Options:
  -s, --schema <schema>      Database schema
  -f, --filter <filter>      Comma-separated list of tables/views  
  -o, --output <output>  Name of output file (STDOUT by default)
  -h, --help             display help for command
```

Some examples:
Generate a model with all tables and views from FLIGHTS schema and writing file in Linux way
```
hana2cds -s FLIGHTS > flights.csn
```

Generate a model with specific tables and writing to a specific file (OS independent)
```
hana2cds -s FLIGHTS --f AIRLINES,FLIGHTS -o flights.csn.json
```

## Storing secrets
There are multiple ways how to store secrets for CDS. I will use the way I test apps using Hana Cloud:

1. login to Hana Cloud instance using `cf login` or via site
2. Create service key 'hana-hdi-key' for a service instance 'hana-hdi'. Names can be different of course
3. `cds bind --to hana-hdi:hana-hdi-key`. If successful this step will create you a file .cdsrc-private.json with your service bidning but without credentials. Beware that by default cds bind generates hybrid profile and you may need to set up `CDS_ENV=hybrid` variable in your environment
4. you may follow documented way (https://cap.cloud.sap/docs/advanced/hybrid-testing#node) and consume credentials with this command: `cds env get requires.db.credentials --resolve-bindings`. 
5. I didn't like the idea to use environment variables or manual copying of that command content and decided to create advanced scenario using file-based secret storage 
```
cds env get requires.db.credentials --resolve-bindings | json2fs --to .cds/requires/db/credentials
```
This additional utility also developed in this project will parse the file and will store secrets in key-based files with the provided path. In can be local path ( make sure you ignore it from git ) or it can be your home directory for example. In this case CDS will be able to read those secrets automatically if you define this PATH in CDS_CONFIG=`/workspace/.cds`. Keep in mind that currenlty CDS_CONFIG only supports absolute paths, and even tilda is not parsed properly. Also notice that the folder should have a structure requires->service_name->credentials and CDS config is ponting to the root folder for requires.