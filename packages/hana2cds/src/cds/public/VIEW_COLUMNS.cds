@cds.persistence.exists
entity VIEW_COLUMNS {
    SCHEMA_NAME    : String;
    VIEW_NAME      : String;
    COLUMN_NAME    : String;
    POSITION       : Integer;
    DATA_TYPE_ID   : Integer;
    DATA_TYPE_NAME : String;
    LENGTH         : Integer;
    SCALE          : Integer;
    COMMENTS       : String;
}
