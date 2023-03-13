using {SYS} from '@sapops/hana-sys-cds';

entity INDEX_COLUMNS as projection on SYS.INDEX_COLUMNS {
        SCHEMA_NAME,
        TABLE_NAME,
    key TABLE_OID,
        INDEX_NAME,
        INDEX_OID,
        CONSTRAINT,
    key COLUMN_NAME,
        POSITION,
        ASCENDING_ORDER
};
