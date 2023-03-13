define make_sys_table_schema
	CDS_CONFIG=.cds npx hana2cds -s SYS -f $1 -p SYS. > packages/hana-sys-cds/SYS/$1.csn
	npx cdsc toCdl packages/hana-sys-cds/SYS/$1.csn --out packages/hana-sys-cds/SYS/$1
	rm packages/hana-sys-cds/SYS/$1.csn
endef

# npx cds compile $1/model.csn --to cdl --dest $1
# rm $1/model.csn $1/namespace.cds	

tables:
	$(call make_sys_table_schema,DATA_TYPES)
	$(call make_sys_table_schema,OBJECTS)
	$(call make_sys_table_schema,TABLES)	
	$(call make_sys_table_schema,TABLE_COLUMNS)
	$(call make_sys_table_schema,INDEX_COLUMNS)
	$(call make_sys_table_schema,VIEWS)
	$(call make_sys_table_schema,VIEW_COLUMNS)
