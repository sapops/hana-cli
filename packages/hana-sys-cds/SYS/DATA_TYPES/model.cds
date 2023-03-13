// generated by cds-compiler version 3.5.4 
@cds.persistence.exists : true
@title : 'Available SQL data types'
entity SYS.DATA_TYPES {
  @title : 'Data type ID'
  TYPE_ID : hana.SMALLINT;
  @title : 'Data type name'
  TYPE_NAME : String(16);
  @title : 'Maximum size of the data type that this system can support'
  COLUMN_SIZE : Integer;
  @title : 'ODBC 2.0 SQLGetTypeInfo Varchar. Character or characters used to prefix a literal, for example, a single quotation mark ('') for character data types or 0x for binary data types; NULL is returned for data types where a literal prefix is not applicable'
  LITERAL_PREFIX : String(1);
  @title : 'ODBC 2.0 SQLGetTypeInfo Varchar. Character or characters used to terminate a literal, for example, a single quotation mark ('') for character data types; NULL is returned for data types where a literal suffix is not applicable'
  LITERAL_SUFFIX : String(1);
  @title : 'ODBC 2.0 SQLGetTypeInfo Varchar. A list of keywords, separated by commas, corresponding to each parameter that the application may specify in parentheses when using the name that is returned in the TYPE_NAME field'
  CREATE_PARAMS : String(16);
  @title : 'Specifies whether the data type can accept null or not'
  NULLABLE : hana.TINYINT;
  @title : 'ODBC 2.0 SQLGetTypeInfo smallint. Whether a character data type is case-sensitive in collations and comparisons'
  CASE_SENSITIVE : hana.TINYINT;
  @title : 'How the data type can be used in the WHERE clause'
  SEARCHABLE : hana.TINYINT;
  @title : 'Signed or unsigned'
  UNSIGNED_ATTRIBUTE : hana.TINYINT;
  @title : 'Whether the data type has predefined fixed precision and scale (ODBC)'
  FIXED_PREC_SCALE : hana.TINYINT;
  @title : 'Whether the data type is autoincrementing (ODBC)'
  AUTO_UNIQUE_VALUE : hana.TINYINT;
  @title : 'ODBC 2.0 SQLGetTypeInfo varchar. Localized version of the data source-dependent name of the data type'
  LOCAL_TYPE_NAME : String(16);
  @title : 'ODBC 2.0 SQLGetTypeInfo smallint. The minimum scale of the data type on the data source'
  MINIMUM_SCALE : hana.SMALLINT;
  @title : 'ODBC 2.0 SQLGetTypeInfo smallint. The maximum scale of the data type on the data source'
  MAXIMUM_SCALE : hana.SMALLINT;
  @title : 'ODBC 3.0 SQLGetTypeInfo smallint. The value of the SQL data type as it appears in the SQL_DESC_TYPE field of the descriptor. This column is the same as the DATATYPE column, except for interval and datetime data types'
  SQL_DATA_TYPE : hana.SMALLINT;
  @title : 'ODBC 3.0 SQLGetTypeInfo smallint. When the value of SQL_DATATYPE is SQL_DATETIME or SQL_INTERVAL, this column contains the datetime/interval subcode'
  SQL_DATETIME_SUB : hana.SMALLINT;
  @title : 'ODBC 3.0 SQLGetTypeInfo integer. In case of an approximate numeric data type, value is 2 to indicate that COLUMN_SIZE specifies the number of bits. For exact numeric data types value 10 indicates that COLUMN_SIZE specifies the number of decimal digits'
  NUM_PREC_RADIX : Integer;
  @title : 'ODBC 3.0 SQLGetTypeInfo smallint. If the data type is an interval data type, then this column contains the value of the interval leading precision. Otherwise, this column is NULL'
  INTERVAL_PRECISION : hana.SMALLINT;
};

