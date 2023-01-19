@cds.persistence.exists
entity VIEWS {
    SCHEMA_NAME : String;
    VIEW_NAME   : String;
    COMMENTS    : String;
    key VIEW_OID    : Integer;
}
