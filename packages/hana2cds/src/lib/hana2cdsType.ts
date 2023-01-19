import assert = require('assert');

enum HanaTypesEnum {
  INTEGER,
  NCLOB,
  BLOB,
  NVARCHAR,
  VARBINARY,
  BIGINT,
  DECIMAL,
  DOUBLE,
  DATE,
  TIME,
  SECONDDATE,
  TIMESTAMP,
  BOOLEAN,
  SMALLINT,
  TINYINT,
  SMALLDECIMAL,
  REAL,
  CLOB,
  CHAR,
  NCHAR,
  BINARY,
  VARCHAR,
  // ST_POINT,
  // ST_GEOMETRY,
}

export interface HanaTypeDefinition {
  DATA_TYPE_NAME: keyof typeof HanaTypesEnum;
  LENGTH: number;
  SCALE: number;
}

const length = (type: TemplateStringsArray) =>
  Object.assign(type.join(), { has_length: true });
const scale = (type: TemplateStringsArray) =>
  Object.assign(type.join(), { has_scale: true });

type HanaTypes = Record<
  keyof typeof HanaTypesEnum,
  string & { has_length?: boolean; has_scale?: boolean }
>;

const hanaTypesMap: HanaTypes = {
  NCLOB: 'cds.LargeString',
  NVARCHAR: length`cds.String`,
  NCHAR: length`hana.NCHAR`,
  TINYINT: 'hana.TINYINT',
  BIGINT: 'cds.Integer64',
  BLOB: 'cds.LargeBinary',
  VARBINARY: length`cds.Binary`,
  BINARY: length`hana.BINARY`,
  CHAR: length`hana.CHAR`,
  DECIMAL: scale`cds.Decimal`,
  INTEGER: 'cds.Integer',
  SMALLINT: 'hana.SMALLINT',
  REAL: 'hana.REAL',
  DOUBLE: 'cds.Double',
  VARCHAR: length`hana.VARCHAR`,
  BOOLEAN: 'cds.Boolean',
  DATE: 'cds.Date',
  TIME: 'cds.Time',
  TIMESTAMP: 'cds.Timestamp',
  SECONDDATE: 'cds.String',
  SMALLDECIMAL: 'hana.SMALLDECIMAL',
  CLOB: 'hana.CLOB',
};

interface CdsType {
  type?: string;
  length?: number;
  scale?: number;
}

// convert hana type defintion to CDS type
export function getCdsType(field: HanaTypeDefinition): CdsType {
  // assert type
  if (!hanaTypesMap[field.DATA_TYPE_NAME]) {
    assert(`Unsupported Hana type ${field.DATA_TYPE_NAME}`);
  }

  const type = hanaTypesMap[field.DATA_TYPE_NAME];

  // map Hana type to CDS type
  const result: CdsType = { type: type.toString() };

  // fill length only if it's needed
  if (type.has_length) {
    result.length = field.LENGTH;
  }

  if (type.has_scale) {
    result.scale = field.SCALE;
  }

  return result;
}
