@cds.persistence.exists
entity VIEWS {
        SCHEMA_NAME : String;
        VIEW_NAME   : String;
    key VIEW_OID    : Integer;
        COMMENTS    : String;
}
