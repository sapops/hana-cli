using {SYS} from '@sapops/hana-sys-cds';

entity VIEW_COLUMNS as projection on SYS.VIEW_COLUMNS {
    key SCHEMA_NAME,
    key VIEW_NAME,
        COLUMN_NAME,
        POSITION,
        DATA_TYPE_ID,
        DATA_TYPE_NAME,
        LENGTH,
        SCALE,
        COMMENTS
}
