using {SYS} from '@sapops/hana-sys-cds';

entity DATA_TYPES as projection on SYS.DATA_TYPES {
    key TYPE_ID,
        TYPE_NAME,
        CREATE_PARAMS
};
