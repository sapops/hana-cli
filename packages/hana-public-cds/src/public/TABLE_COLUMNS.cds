@cds.persistence.exists: true
entity TABLE_COLUMNS {
    key SCHEMA_NAME    : String;
    key TABLE_NAME     : String;
        COLUMN_NAME    : String;
        POSITION       : String;
        DATA_TYPE_ID   : String;
        DATA_TYPE_NAME : String;
        LENGTH         : String;
        SCALE          : String;
        COMMENTS       : String;
}
