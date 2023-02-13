entity INDEX_COLUMNS {
      SCHEMA_NAME     : String(256);
      TABLE_NAME      : String(256);
  key TABLE_OID       : Integer64;
      INDEX_NAME      : String(256);
      INDEX_OID       : Integer64;
      CONSTRAINT      : String(32);
  key COLUMN_NAME     : String(256);
      POSITION        : hana.SMALLINT;
      ASCENDING_ORDER : String(5);
};
