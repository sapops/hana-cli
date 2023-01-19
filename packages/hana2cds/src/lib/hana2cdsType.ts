import assert = require('assert');

const length = (type: TemplateStringsArray) =>
  Object.assign(type.join(), { has_length: true });

const scale = (type: TemplateStringsArray) =>
  Object.assign(type.join(), { has_scale: true });

// const srid = (type: TemplateStringsArray) =>
//   Object.assign(type.join(), { has_srid: true });

type HanaTypes = Record<
  string,
  string & { has_length?: boolean; has_scale?: boolean; has_srid?: boolean }
>;

const hanaTypesMap: HanaTypes = {
  NCLOB: 'LargeString',
  NVARCHAR: length`String`,
  NCHAR: length`hana.NCHAR`,
  TINYINT: 'hana.TINYINT',
  BIGINT: 'Integer64',
  BLOB: 'LargeBinary',
  VARBINARY: length`Binary`,
  BINARY: length`hana.BINARY`,
  CHAR: length`hana.CHAR`,
  DECIMAL: scale`Decimal`,
  INTEGER: 'Integer',
  SMALLINT: 'hana.SMALLINT',
  REAL: 'hana.REAL',
  DOUBLE: 'Double',
  VARCHAR: length`hana.VARCHAR`,
  BOOLEAN: 'Boolean',
  DATE: 'Date',
  TIME: 'Time',
  TIMESTAMP: 'Timestamp',
  SECONDDATE: 'String',
  SMALLDECIMAL: 'hana.SMALLDECIMAL',
  CLOB: 'hana.CLOB',
  // ST_POINT: srid`hana.ST_POINT`,
  // ST_GEOMETRY: srid`hana.ST_GEOMETRY`,
};

interface CdsType {
  type?: string;
  length?: number;
  scale?: number;
  precision?: number;
  srid?: number;
}

interface HanaTypeDefinition {
  DATA_TYPE_NAME: keyof HanaTypes;
  LENGTH: number;
  SCALE: number;
}

// convert hana type defintion to CDS type
export function getCdsType(field: HanaTypeDefinition): CdsType {
  // assert type
  if (!hanaTypesMap[field.DATA_TYPE_NAME]) {
    assert(`Unsupported Hana type ${field.DATA_TYPE_NAME}`);
  }

  const type = hanaTypesMap[field.DATA_TYPE_NAME];

  // map Hana type to CDS type
  const result: CdsType = { type: `cds.${type.toString()}` };

  // fill length only if it's needed
  if (type.has_length) {
    result.length = field.LENGTH;
  }

  if (type.has_scale) {
    result.precision = field.LENGTH;
    if (field.SCALE) {
      result.scale = field.SCALE;
    }
  }

  return result;
}
