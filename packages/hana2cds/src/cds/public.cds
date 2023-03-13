using {DATA_TYPES} from './SYS/DATA_TYPES';
using {VIEW_COLUMNS} from './SYS/VIEW_COLUMNS';
using {TABLE_COLUMNS} from './SYS/TABLE_COLUMNS';
using {VIEWS} from './SYS/VIEWS';
using {TABLES} from './SYS/TABLES';
using {INDEX_COLUMNS} from './SYS/INDEX_COLUMNS';
using {OBJECTS} from './SYS/OBJECTS';


extend projection VIEW_COLUMNS with {
     data_type : Association to one DATA_TYPES on data_type.TYPE_ID = DATA_TYPE_ID
}

extend projection TABLE_COLUMNS with {
     data_type : Association to one DATA_TYPES on data_type.TYPE_ID = DATA_TYPE_ID
}

extend projection VIEWS with {
     columns : Association to many VIEW_COLUMNS on columns.SCHEMA_NAME = SCHEMA_NAME
               and                                 columns.VIEW_NAME   = VIEW_NAME
};

extend projection TABLES with {
     columns : Association to many TABLE_COLUMNS on columns.SCHEMA_NAME = SCHEMA_NAME
               and                                  columns.TABLE_NAME  = TABLE_NAME,
     keys    : Association to many INDEX_COLUMNS on keys.TABLE_OID  = TABLE_OID
               and                                  keys.CONSTRAINT = 'PRIMARY KEY'
};

extend projection OBJECTS with {
     table : Association to one TABLES on table.TABLE_OID = OBJECT_OID
             and                          OBJECT_TYPE     = 'TABLE',
     view  : Association to one VIEWS on view.VIEW_OID = OBJECT_OID
             and                         OBJECT_TYPE   = 'VIEW'
}
