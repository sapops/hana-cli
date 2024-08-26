using {DATA_TYPES} from './public/DATA_TYPES';
using {VIEW_COLUMNS} from './public/VIEW_COLUMNS';
using {TABLE_COLUMNS} from './public/TABLE_COLUMNS';
using {VIEWS} from './public/VIEWS';
using {TABLES} from './public/TABLES';
using {OBJECTS} from './public/OBJECTS';
using {INDEX_COLUMNS} from './public/INDEX_COLUMNS';
using {SYNONYMS} from './public/SYNONYMS';

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

extend SYNONYMS with {
     object : Association to one OBJECTS
                   on  object.SCHEMA_NAME = SCHEMA_NAME
                   and object.OBJECT_NAME = OBJECT_NAME
                   and object.OBJECT_TYPE = OBJECT_TYPE;
}
