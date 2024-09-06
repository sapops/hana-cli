# CDS helper tool

It's a helper CLI tool to generate CAP artifacts for your project

## Installation

```
npm i -D cdsgen
```

## Commands

```
COMMANDS
  $ cds2syn synonyms                • Generate hdbsynonym file
```

### Generate synonyms from CAP model

```
DESCRIPTION
  Generate hdbsynonym file

USAGE
  $ cds2syn synonyms

OPTIONS
  --help                            • Display instructions for the command.
  --model                           • CDS model name
  --output                          • Output file
  --parseable                       • Parseable CLI output (JSON)
  --plain                           • Use plain SQL mapping
  --quoted                          • Use quuoted SQL mapping
  --regex                           • Filter entities by regex
  --schema                          • Target schema
```

- `model` is a required parameter compatible with [cds.resolve](https://cap.cloud.sap/docs/node.js/cds-compile#cds-resolve)
- `output` is an optional parameter to specify the output file path
- `parseable` makes sure the output of the command is parseable (JSON) format, that's how it may be used in pipe commands
- `plain` and `quoted` directives tell the tool to which format the SQL mapping should be generated. You can use both at the same time.
- `regex` is a useful parameter to filter out entities you want to generate the synonyms for.
- `schema` parameter allows you to generate synonyms for a specific schema. It's optional.

## Examples

One of the most common use cases is to generate synonyms for the existing database tables.

Let's say you have the app which connects to the extenal schema. In this case even if you generate relevant CDS files with a tool like [hana2cds](../hana2cds/), you still need to generate synonyms for the tables and views if they use `@cds.persistence.exist: true` because those artifacts are not created automatically.

Let's say you have an app connected to the external schema EXTERNAL_SCHEMA . The very first step could be is to generate CDS model for the external schema with a command like :

```bash
# hana2cds always generates CSN schema
npx hana2cds --schema EXTERNAL_SCHEMA --filter EXTERNAL_TABLE > schema.csn
# You may convert it to CDS model but is ok to use CSN for synonmys generation too
# This command will generate CDS model from the created CSN file
cds compile --to cdl schema.csn --dest schema
```

As a result you may get a file like:

```cds
@cds.persistence.exist: true
entity EXTERNAL_TABLE {
    key ID : Integer;
    key NAME : String;
    DATE_CREATED : Timestamp;
    ...
}
```

Now you can generate synonyms with the following command:

```bash
npx cdsgen synonyms --model schema --output db/gen/external_schema.hdbsynonym --schema EXTERNAL_SCHEMA
```

as a result you will get a file like:

```hdbsynonym
{
  "EXTENAL_TABLE"" : {
    "target":{
      "object":"EXTERNAL_TABLE",
      "schema":"EXTERNAL_SCHEMA"
    }
  }
}
```

it also allows you to generate synonyms for entities with special characters like `::`.

Let's say we have a schema with hdbcds entities there in a format like `org.namespace::Foo.Bar`.

Generating CDS for such a table would result in a file like:

```cds
@cds.persistence.exists : true
@title : 'Foo Bar'
entity org.![namespace::Foo].Bar {
  @title : 'Id'
  key ID : String(100);
  @title : 'Type'
  key TYPE : String(100);
  @title : 'Name'
  NAME : String(255);
};
```

The problem is that when you build such a model for hana and let's say you want use as projection in another cds view CAP framework will transform such a name into something like `org.namespace.Foo.Bar` which is not the same as `org.namespace::Foo.Bar`. With the help of our tool - we can just give it a whole CDS model and it will try to generate synomys for such entities respecting this rule:

```
cdsgen synonyms --model model.cds --schema EXTERNAL_SCHEMA --quoted
```

The `--quoted` directive will generate synonyms in a format compatible to `"sql_mapping" : "quoted"` in cds configuration.

The result will be:

```hdbsynonym
{
  "org.namespace.Foo.Bar"" : {
    "target":{
      "object":"org.namespace::Foo.Bar",
      "schema":"EXTERNAL_SCHEMA"
    }
  }
}
```

Another use case - is the opposite to quoted plain format. In this case you can use `--plain` directive and it will generate synonyms in a format compatible to `"sql_mapping" : "plain"` in cds configuration:

```hdbsynonym
{
  "ORG_NAMESPACE_FOO_BAR"" : {
    "target":{
      "object":"org.namespace::Foo.Bar",
      "schema":"EXTERNAL_SCHEMA"
    }
  }
}
```

## Contribution

This project is open source and you are very welcome to contribute. It is build using following tools:

- TypeScript only
- [CAP framework](https://cap.cloud.sap/docs/) is the core component. This project is supposed to be the extension of CDS toolkit and tries to delegate as much logic as it can to the core @sap/cds component.
- [moost](https://moost.org/cliapp/) An amazing framework to build apps ( no matter if it's CLI or web app ) build by @mav-rik. If you are not familiar with it, we recommend to check it out.
