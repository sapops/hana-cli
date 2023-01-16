using from './public/TABLES';
using from './public/VIEWS';
using VIEW_COLUMNS from './public/VIEW_COLUMNS';

extend VIEWS with {
     columns : Association to many VIEW_COLUMNS
                    on  columns.SCHEMA_NAME = SCHEMA_NAME
                    and columns.VIEW_NAME   = VIEW_NAME;
}
