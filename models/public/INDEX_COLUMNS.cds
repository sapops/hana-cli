entity INDEX_COLUMNS {
        SCHEMA_NAME     : String;
        TABLE_NAME      : String;
    key TABLE_OID       : String;
        INDEX_NAME      : String;
        INDEX_OID       : String;
        CONSTRAINT      : String;
    key COLUMN_NAME     : String;
        POSITION        : String;
        ASCENDING_ORDER : String;
};
