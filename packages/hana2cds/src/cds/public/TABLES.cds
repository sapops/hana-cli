@cds.persistence.exists
entity TABLES {
    SCHEMA_NAME : String;
    TABLE_NAME  : String;
    COMMENTS    : String;
    key TABLE_OID   : Integer;
}
