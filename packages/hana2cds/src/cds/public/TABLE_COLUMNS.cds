@cds.persistence.exists: true
entity TABLE_COLUMNS {
    key SCHEMA_NAME    : String;
    key TABLE_NAME     : String;
        COLUMN_NAME    : String;
        POSITION       : Integer;
        DATA_TYPE_ID   : String;
        DATA_TYPE_NAME : String;
        LENGTH         : Integer;
        SCALE          : Integer;
        COMMENTS       : String;
}
