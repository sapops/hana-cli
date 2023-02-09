using {DATA_TYPES, VIEW_COLUMNS, TABLE_COLUMNS, TABLES, VIEWS } from './tables';

extend VIEW_COLUMNS with {
     data_type: Association to one DATA_TYPES on data_type.TYPE_ID = DATA_TYPE_ID
}

extend TABLE_COLUMNS with {
     data_type: Association to one DATA_TYPES on data_type.TYPE_ID = DATA_TYPE_ID
}

extend VIEWS with {
     columns : Association to many VIEW_COLUMNS
                    on  columns.SCHEMA_NAME = SCHEMA_NAME
                    and columns.VIEW_NAME   = VIEW_NAME;
};

extend TABLES with {
     columns : Association to many TABLE_COLUMNS
                    on  columns.SCHEMA_NAME = SCHEMA_NAME
                    and columns.TABLE_NAME  = TABLE_NAME;
};

extend OBJECTS with {
     table : Association to one TABLES
                  on  table.TABLE_OID = OBJECT_OID
                  and OBJECT_TYPE     = 'TABLE';
     view : Association to one VIEWS
                  on  view.VIEW_OID = OBJECT_OID
                  and OBJECT_TYPE     = 'VIEW';
}
