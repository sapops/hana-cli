using VIEW_COLUMNS from './VIEW_COLUMNS';
@cds.persistence.exists
entity ![VIEWS] {
    key SCHEMA_NAME : String;
    key VIEW_NAME  : String;
    columns: Association to many VIEW_COLUMNS on
            columns.SCHEMA_NAME = SCHEMA_NAME and
            columns.VIEW_NAME = VIEW_NAME
}
