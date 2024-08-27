@cds.persistence.exists: true
entity VIEW_COLUMNS {
    key SCHEMA_NAME    : String;
    key VIEW_NAME      : String;
    key COLUMN_NAME    : String;
        POSITION       : Integer;
        DATA_TYPE_ID   : String;
        DATA_TYPE_NAME : String;
        LENGTH         : Integer;
        SCALE          : Integer;
        COMMENTS       : String;
}
