@cds.persistence.exists: true
entity VIEW_COLUMNS {
    key SCHEMA_NAME    : String;
    key VIEW_NAME      : String;
    key COLUMN_NAME    : String;
        POSITION       : String;
        DATA_TYPE_ID   : String;
        DATA_TYPE_NAME : String;
        LENGTH         : String;
        SCALE          : String;
        COMMENTS       : String;
}
