using {SYS} from '@sapops/hana-sys-cds';

entity TABLES as projection on SYS.TABLES {
        SCHEMA_NAME,
        TABLE_NAME,
    key TABLE_OID,
        COMMENTS
}
