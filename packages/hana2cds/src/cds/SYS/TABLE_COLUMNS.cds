using {SYS} from '@sapops/hana-sys-cds';

entity TABLE_COLUMNS as projection on SYS.TABLE_COLUMNS {
    key SCHEMA_NAME,
    key TABLE_NAME,
        COLUMN_NAME,
        POSITION,
        DATA_TYPE_ID,
        DATA_TYPE_NAME,
        LENGTH,
        SCALE,
        COMMENTS
}
