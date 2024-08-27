@cds.persistence.exists: true
entity SYNONYMS {
    SCHEMA_NAME            : String;
    SYNONYM_NAME           : String;
    SYNONYM_OID            : String;
    OBJECT_DATABASE_SCHEMA : String;
    OBJECT_DATABASE        : String;
    OBJECT_SCHEMA          : String;
    OBJECT_NAME            : String;
    OBJECT_TYPE            : String;
    IS_COLUMN_OBJECT       : String;
    // IS_VALID               : String;
    // CREATE_TIME            : String;
}
