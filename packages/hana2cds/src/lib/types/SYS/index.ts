// This is an automatically generated file. Please do not change its contents manually!
import * as __ from './../_';
import * as _cds_hana from './../cds/hana';
export function _OBJECTSAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class OBJECTS extends Base {
        declare OBJECT_CATEGORY?: string | null;
        declare SCHEMA_NAME?: string | null;
        declare OBJECT_NAME?: string | null;
        declare OBJECT_TYPE?: string | null;
        declare OBJECT_OID?: number | null;
        declare table?: __.Association.to<TABLES> | null;
        declare view?: __.Association.to<VIEWS> | null;
      declare static readonly actions: Record<never, never>
  };
}
export class OBJECTS extends _OBJECTSAspect(__.Entity) {}
Object.defineProperty(OBJECTS, 'name', { value: 'SYS.OBJECTS' })
Object.defineProperty(OBJECTS, 'is_singular', { value: true })
export class OBJECTS_ extends Array<OBJECTS> {$count?: number}
Object.defineProperty(OBJECTS_, 'name', { value: 'SYS.OBJECTS' })

export function _VIEWSAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class VIEWS extends Base {
        declare SCHEMA_NAME?: string | null;
        declare VIEW_NAME?: string | null;
        declare VIEW_OID?: number | null;
        declare IS_READ_ONLY?: string | null;
        declare IS_DDL_ONLY?: string | null;
        declare HAS_CHECK_OPTION?: string | null;
        declare HAS_COLUMN_ALIASES?: string | null;
        declare DEFINITION?: string | null;
        declare COMMENTS?: string | null;
        declare IS_COLUMN_VIEW?: string | null;
        declare VIEW_TYPE?: string | null;
        declare IS_VALID?: string | null;
        declare HAS_STRUCTURED_PRIVILEGE_CHECK?: string | null;
        declare HAS_MASKED_COLUMNS?: string | null;
        declare MASK_MODE?: string | null;
        declare HAS_PARAMETERS?: string | null;
        declare HAS_ANONYMIZATION?: string | null;
        declare HAS_CACHE?: string | null;
        declare CREATE_TIME?: __.CdsTimestamp | null;
        declare columns?: __.Association.to.many<VIEW_COLUMNS_>;
      declare static readonly actions: Record<never, never>
  };
}
export class VIEWS extends _VIEWSAspect(__.Entity) {}
Object.defineProperty(VIEWS, 'name', { value: 'SYS.VIEWS' })
Object.defineProperty(VIEWS, 'is_singular', { value: true })
export class VIEWS_ extends Array<VIEWS> {$count?: number}
Object.defineProperty(VIEWS_, 'name', { value: 'SYS.VIEWS' })

export function _TABLESAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TABLES extends Base {
        declare SCHEMA_NAME?: string | null;
        declare TABLE_NAME?: string | null;
        declare TABLE_OID?: number | null;
        declare COMMENTS?: string | null;
        declare FIXED_PART_SIZE?: _cds_hana.SMALLINT | null;
        declare IS_LOGGED?: string | null;
        declare IS_SYSTEM_TABLE?: string | null;
        declare IS_COLUMN_TABLE?: string | null;
        declare TABLE_TYPE?: string | null;
        declare IS_INSERT_ONLY?: string | null;
        declare IS_TEMPORARY?: string | null;
        declare TEMPORARY_TABLE_TYPE?: string | null;
        declare COMMIT_ACTION?: string | null;
        declare IS_USER_DEFINED_TYPE?: string | null;
        declare HAS_PRIMARY_KEY?: string | null;
        declare USES_EXTKEY?: string | null;
        declare AUTO_MERGE_ON?: string | null;
        declare USES_DIMFN_CACHE?: string | null;
        declare IS_PUBLIC?: string | null;
        declare AUTO_OPTIMIZE_COMPRESSION_ON?: string | null;
        declare COMPRESSED_EXTKEY?: string | null;
        declare HAS_TEXT_FIELDS?: string | null;
        declare USES_QUEUE_TABLE?: string | null;
        declare IS_PRELOAD?: string | null;
        declare IS_PARTIAL_PRELOAD?: string | null;
        declare UNLOAD_PRIORITY?: _cds_hana.TINYINT | null;
        declare IS_REPLICA?: string | null;
        declare HAS_STRUCTURED_PRIVILEGE_CHECK?: string | null;
        declare ROW_ORDER_TYPE?: string | null;
        declare CREATE_TIME?: __.CdsTimestamp | null;
        declare TEMPORAL_TYPE?: string | null;
        declare HAS_MASKED_COLUMNS?: string | null;
        declare MASK_MODE?: string | null;
        declare PERSISTENT_MEMORY?: string | null;
        declare HAS_RECORD_COMMIT_TIMESTAMP?: string | null;
        declare IS_REPLICATION_LOG_ENABLED?: string | null;
        declare NUMA_NODE_INDEXES?: string | null;
        declare IS_MOVABLE?: string | null;
        declare LOAD_UNIT?: string | null;
        declare columns?: __.Association.to.many<TABLE_COLUMNS_>;
        declare keys?: __.Association.to.many<INDEX_COLUMNS_>;
      declare static readonly actions: Record<never, never>
  };
}
export class TABLES extends _TABLESAspect(__.Entity) {}
Object.defineProperty(TABLES, 'name', { value: 'SYS.TABLES' })
Object.defineProperty(TABLES, 'is_singular', { value: true })
export class TABLES_ extends Array<TABLES> {$count?: number}
Object.defineProperty(TABLES_, 'name', { value: 'SYS.TABLES' })

export function _VIEW_COLUMNSAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class VIEW_COLUMNS extends Base {
        declare SCHEMA_NAME?: string | null;
        declare VIEW_NAME?: string | null;
        declare VIEW_OID?: number | null;
        declare COLUMN_NAME?: string | null;
        declare POSITION?: number | null;
        declare DATA_TYPE_ID?: _cds_hana.SMALLINT | null;
        declare DATA_TYPE_NAME?: string | null;
        declare OFFSET?: _cds_hana.SMALLINT | null;
        declare LENGTH?: number | null;
        declare SCALE?: number | null;
        declare IS_NULLABLE?: string | null;
        declare DEFAULT_VALUE?: string | null;
        declare COMMENTS?: string | null;
        declare DDIC_DATA_TYPE_ID?: number | null;
        declare DDIC_DATA_TYPE_NAME?: string | null;
        declare COMPRESSION_TYPE?: string | null;
        declare INDEX_TYPE?: string | null;
        declare COLUMN_ID?: number | null;
        declare PRELOAD?: string | null;
        declare GENERATED_ALWAYS_AS?: string | null;
        declare FUZZY_SEARCH_INDEX?: string | null;
        declare FUZZY_SEARCH_MODE?: string | null;
        declare MEMORY_THRESHOLD?: number | null;
        declare LOAD_UNIT?: string | null;
        declare GENERATION_TYPE?: string | null;
        declare IS_CACHABLE?: string | null;
        declare IS_CACHE_KEY?: string | null;
        declare ROW_ORDER_POSITION?: string | null;
        declare IS_HIDDEN?: string | null;
        declare IS_MASKED?: string | null;
        declare MASK_EXPRESSION?: string | null;
        declare CLIENTSIDE_ENCRYPTION_STATUS?: string | null;
        declare CLIENTSIDE_ENCRYPTION_COLUMN_KEY_ID?: string | null;
        declare CLIENTSIDE_ENCRYPTION_MODE?: string | null;
        declare PERSISTENT_MEMORY?: string | null;
        declare NUMA_NODE_INDEXES?: string | null;
        declare data_type?: __.Association.to<DATA_TYPES> | null;
      declare static readonly actions: Record<never, never>
  };
}
export class VIEW_COLUMNS extends _VIEW_COLUMNSAspect(__.Entity) {}
Object.defineProperty(VIEW_COLUMNS, 'name', { value: 'SYS.VIEW_COLUMNS' })
Object.defineProperty(VIEW_COLUMNS, 'is_singular', { value: true })
export class VIEW_COLUMNS_ extends Array<VIEW_COLUMNS> {$count?: number}
Object.defineProperty(VIEW_COLUMNS_, 'name', { value: 'SYS.VIEW_COLUMNS' })

export function _TABLE_COLUMNSAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TABLE_COLUMNS extends Base {
        declare SCHEMA_NAME?: string | null;
        declare TABLE_NAME?: string | null;
        declare TABLE_OID?: number | null;
        declare COLUMN_NAME?: string | null;
        declare POSITION?: number | null;
        declare DATA_TYPE_ID?: _cds_hana.SMALLINT | null;
        declare DATA_TYPE_NAME?: string | null;
        declare OFFSET?: _cds_hana.SMALLINT | null;
        declare LENGTH?: number | null;
        declare SCALE?: number | null;
        declare IS_NULLABLE?: string | null;
        declare DEFAULT_VALUE?: string | null;
        declare COMMENTS?: string | null;
        declare DDIC_DATA_TYPE_ID?: number | null;
        declare DDIC_DATA_TYPE_NAME?: string | null;
        declare COMPRESSION_TYPE?: string | null;
        declare INDEX_TYPE?: string | null;
        declare COLUMN_ID?: number | null;
        declare PRELOAD?: string | null;
        declare GENERATED_ALWAYS_AS?: string | null;
        declare FUZZY_SEARCH_INDEX?: string | null;
        declare FUZZY_SEARCH_MODE?: string | null;
        declare MEMORY_THRESHOLD?: number | null;
        declare LOAD_UNIT?: string | null;
        declare GENERATION_TYPE?: string | null;
        declare IS_CACHABLE?: string | null;
        declare IS_CACHE_KEY?: string | null;
        declare ROW_ORDER_POSITION?: _cds_hana.SMALLINT | null;
        declare IS_HIDDEN?: string | null;
        declare IS_MASKED?: string | null;
        declare MASK_EXPRESSION?: string | null;
        declare CLIENTSIDE_ENCRYPTION_STATUS?: string | null;
        declare CLIENTSIDE_ENCRYPTION_COLUMN_KEY_ID?: string | null;
        declare CLIENTSIDE_ENCRYPTION_MODE?: string | null;
        declare PERSISTENT_MEMORY?: string | null;
        declare NUMA_NODE_INDEXES?: string | null;
        declare data_type?: __.Association.to<DATA_TYPES> | null;
      declare static readonly actions: Record<never, never>
  };
}
export class TABLE_COLUMNS extends _TABLE_COLUMNSAspect(__.Entity) {}
Object.defineProperty(TABLE_COLUMNS, 'name', { value: 'SYS.TABLE_COLUMNS' })
Object.defineProperty(TABLE_COLUMNS, 'is_singular', { value: true })
export class TABLE_COLUMNS_ extends Array<TABLE_COLUMNS> {$count?: number}
Object.defineProperty(TABLE_COLUMNS_, 'name', { value: 'SYS.TABLE_COLUMNS' })

export function _DATA_TYPESAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class DATA_TYPES extends Base {
        declare TYPE_ID?: _cds_hana.SMALLINT | null;
        declare TYPE_NAME?: string | null;
        declare COLUMN_SIZE?: number | null;
        declare LITERAL_PREFIX?: string | null;
        declare LITERAL_SUFFIX?: string | null;
        declare CREATE_PARAMS?: string | null;
        declare NULLABLE?: _cds_hana.TINYINT | null;
        declare CASE_SENSITIVE?: _cds_hana.TINYINT | null;
        declare SEARCHABLE?: _cds_hana.TINYINT | null;
        declare UNSIGNED_ATTRIBUTE?: _cds_hana.TINYINT | null;
        declare FIXED_PREC_SCALE?: _cds_hana.TINYINT | null;
        declare AUTO_UNIQUE_VALUE?: _cds_hana.TINYINT | null;
        declare LOCAL_TYPE_NAME?: string | null;
        declare MINIMUM_SCALE?: _cds_hana.SMALLINT | null;
        declare MAXIMUM_SCALE?: _cds_hana.SMALLINT | null;
        declare SQL_DATA_TYPE?: _cds_hana.SMALLINT | null;
        declare SQL_DATETIME_SUB?: _cds_hana.SMALLINT | null;
        declare NUM_PREC_RADIX?: number | null;
        declare INTERVAL_PRECISION?: _cds_hana.SMALLINT | null;
      declare static readonly actions: Record<never, never>
  };
}
export class DATA_TYPES extends _DATA_TYPESAspect(__.Entity) {}
Object.defineProperty(DATA_TYPES, 'name', { value: 'SYS.DATA_TYPES' })
Object.defineProperty(DATA_TYPES, 'is_singular', { value: true })
export class DATA_TYPES_ extends Array<DATA_TYPES> {$count?: number}
Object.defineProperty(DATA_TYPES_, 'name', { value: 'SYS.DATA_TYPES' })

export function _INDEX_COLUMNSAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class INDEX_COLUMNS extends Base {
        declare SCHEMA_NAME?: string | null;
        declare TABLE_NAME?: string | null;
        declare TABLE_OID?: number | null;
        declare INDEX_NAME?: string | null;
        declare INDEX_OID?: number | null;
        declare CONSTRAINT?: string | null;
        declare COLUMN_NAME?: string | null;
        declare POSITION?: _cds_hana.SMALLINT | null;
        declare ASCENDING_ORDER?: string | null;
      declare static readonly actions: Record<never, never>
  };
}
export class INDEX_COLUMNS extends _INDEX_COLUMNSAspect(__.Entity) {}
Object.defineProperty(INDEX_COLUMNS, 'name', { value: 'SYS.INDEX_COLUMNS' })
Object.defineProperty(INDEX_COLUMNS, 'is_singular', { value: true })
export class INDEX_COLUMNS_ extends Array<INDEX_COLUMNS> {$count?: number}
Object.defineProperty(INDEX_COLUMNS_, 'name', { value: 'SYS.INDEX_COLUMNS' })
