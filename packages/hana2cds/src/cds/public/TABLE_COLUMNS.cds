@cds.persistence.exists
entity TABLE_COLUMNS {
    SCHEMA_NAME    : String;
    TABLE_NAME     : String;
    COLUMN_NAME    : String;
    POSITION       : Integer;
    DATA_TYPE_NAME : String;
    LENGTH         : Integer;
    SCALE          : Integer;
    COMMENTS       : String;
}
