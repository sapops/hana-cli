@cds.persistence.exists
entity DATA_TYPES {
    key TYPE_ID: hana.SMALLINT;
    CREATE_PARAMS: String(16);
}
