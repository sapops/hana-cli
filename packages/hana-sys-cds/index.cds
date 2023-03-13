using {
     SYS.DATA_TYPES as DATA_TYPES,
     SYS.VIEW_COLUMNS as VIEW_COLUMNS,
     SYS.TABLE_COLUMNS as TABLE_COLUMNS,
     SYS.TABLES as TABLES,
     SYS.VIEWS as VIEWS,
     SYS.INDEX_COLUMNS as INDEX_COLUMNS,
     SYS.OBJECTS as OBJECTS
} from './SYS/tables';

extend VIEW_COLUMNS with {
     data_type : Association to one DATA_TYPES
                      on data_type.TYPE_ID = DATA_TYPE_ID
}

extend TABLE_COLUMNS with {
     data_type : Association to one DATA_TYPES
                      on data_type.TYPE_ID = DATA_TYPE_ID
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
     keys    : Association to many INDEX_COLUMNS
                    on  keys.TABLE_OID  = TABLE_OID
                    and keys.CONSTRAINT = 'PRIMARY KEY';
};

extend OBJECTS with {
     table : Association to one TABLES
                  on  table.TABLE_OID = OBJECT_OID
                  and OBJECT_TYPE     = 'TABLE';
     view  : Association to one VIEWS
                  on  view.VIEW_OID = OBJECT_OID
                  and OBJECT_TYPE   = 'VIEW';
}
