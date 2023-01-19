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

type HanaTypeMapper = (input: HanaTypeDefinition) => string;

type HanaTypes = Record<keyof typeof HanaTypesEnum, string | HanaTypeMapper>;

const hanaType: HanaTypeMapper = ({ DATA_TYPE_NAME, LENGTH }) =>
  LENGTH ? `hana.${DATA_TYPE_NAME}(${LENGTH})` : `hana.${DATA_TYPE_NAME}`;

const hanaTypesMap: HanaTypes = {
  INTEGER: 'Integer',
  BIGINT: 'Integer64',
  DOUBLE: 'Double',
  NCLOB: 'LargeString',
  BLOB: 'LargeBinary',
  NVARCHAR: ({ LENGTH }) => `String(${LENGTH})`,
  VARBINARY: ({ LENGTH }) => `Binary(${LENGTH})`,
  DECIMAL: ({ SCALE, LENGTH }) =>
    SCALE ? `Decimal(${LENGTH}, ${SCALE})` : `Decimal(${LENGTH})`,
  DATE: 'Date',
  TIME: 'Time',
  SECONDDATE: 'String',
  TIMESTAMP: 'Timestamp',
  BOOLEAN: 'Boolean',
  SMALLINT: hanaType,
  TINYINT: hanaType,
  SMALLDECIMAL: hanaType,
  REAL: hanaType,
  CLOB: hanaType,
  CHAR: hanaType,
  NCHAR: hanaType,
  BINARY: hanaType,
  VARCHAR: hanaType,
};

// convert hana type defintion to CDS type
export function getCdsType(field: HanaTypeDefinition) {
  const hanaType =
    hanaTypesMap[field.DATA_TYPE_NAME] ||
    assert(`Unsupported Hana type ${field.DATA_TYPE_NAME}`);

  return typeof hanaType === 'function' ? hanaType(field) : hanaType;
}
