using {SYS} from '@sapops/hana-sys-cds';

entity VIEWS as projection on SYS.VIEWS {
        SCHEMA_NAME,
        VIEW_NAME,
    key VIEW_OID,
        COMMENTS
}
