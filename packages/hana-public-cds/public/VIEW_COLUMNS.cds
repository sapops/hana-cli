@cds.persistence.exists
@cds.autoexpose
entity ![VIEW_COLUMNS] {
    key SCHEMA_NAME : String;
    key VIEW_NAME  : String;
    key COLUMN_NAME: String;
    POSITION: Integer;
}
