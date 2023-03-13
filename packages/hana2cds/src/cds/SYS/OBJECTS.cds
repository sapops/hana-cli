using {SYS} from '@sapops/hana-sys-cds';

entity OBJECTS as projection on SYS.OBJECTS {
    SCHEMA_NAME,
    OBJECT_NAME,
    OBJECT_TYPE,
    OBJECT_OID
}
