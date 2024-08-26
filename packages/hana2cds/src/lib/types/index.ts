// This is an automatically generated file. Please do not change its contents manually!
import * as _cds_hana from './cds/hana';
import * as __ from './_';
export function _DATA_TYPESAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class DATA_TYPES extends Base {
        declare TYPE_ID?: _cds_hana.SMALLINT;
        declare TYPE_NAME?: string | null;
        declare CREATE_PARAMS?: string | null;
      declare static readonly actions: Record<never, never>
  };
}
export class DATA_TYPES extends _DATA_TYPESAspect(__.Entity) {}
Object.defineProperty(DATA_TYPES, 'name', { value: 'DATA_TYPES' })
Object.defineProperty(DATA_TYPES, 'is_singular', { value: true })
export class DATA_TYPES_ extends Array<DATA_TYPES> {$count?: number}
Object.defineProperty(DATA_TYPES_, 'name', { value: 'DATA_TYPES' })

export function _VIEW_COLUMNSAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class VIEW_COLUMNS extends Base {
        declare SCHEMA_NAME?: string;
        declare VIEW_NAME?: string;
        declare COLUMN_NAME?: string | null;
        declare POSITION?: number | null;
        declare DATA_TYPE_ID?: _cds_hana.SMALLINT | null;
        declare DATA_TYPE_NAME?: string | null;
        declare LENGTH?: number | null;
        declare SCALE?: number | null;
        declare COMMENTS?: string | null;
        declare data_type?: __.Association.to<DATA_TYPES> | null;
      declare static readonly actions: Record<never, never>
  };
}
export class VIEW_COLUMNS extends _VIEW_COLUMNSAspect(__.Entity) {}
Object.defineProperty(VIEW_COLUMNS, 'name', { value: 'VIEW_COLUMNS' })
Object.defineProperty(VIEW_COLUMNS, 'is_singular', { value: true })
export class VIEW_COLUMNS_ extends Array<VIEW_COLUMNS> {$count?: number}
Object.defineProperty(VIEW_COLUMNS_, 'name', { value: 'VIEW_COLUMNS' })

export function _TABLE_COLUMNSAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TABLE_COLUMNS extends Base {
        declare SCHEMA_NAME?: string;
        declare TABLE_NAME?: string;
        declare COLUMN_NAME?: string | null;
        declare POSITION?: number | null;
        declare DATA_TYPE_ID?: _cds_hana.SMALLINT | null;
        declare DATA_TYPE_NAME?: string | null;
        declare LENGTH?: number | null;
        declare SCALE?: number | null;
        declare COMMENTS?: string | null;
        declare data_type?: __.Association.to<DATA_TYPES> | null;
      declare static readonly actions: Record<never, never>
  };
}
export class TABLE_COLUMNS extends _TABLE_COLUMNSAspect(__.Entity) {}
Object.defineProperty(TABLE_COLUMNS, 'name', { value: 'TABLE_COLUMNS' })
Object.defineProperty(TABLE_COLUMNS, 'is_singular', { value: true })
export class TABLE_COLUMNS_ extends Array<TABLE_COLUMNS> {$count?: number}
Object.defineProperty(TABLE_COLUMNS_, 'name', { value: 'TABLE_COLUMNS' })

export function _VIEWSAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class VIEWS extends Base {
        declare SCHEMA_NAME?: string | null;
        declare VIEW_NAME?: string | null;
        declare VIEW_OID?: number;
        declare COMMENTS?: string | null;
        declare columns?: __.Association.to.many<VIEW_COLUMNS_>;
      declare static readonly actions: Record<never, never>
  };
}
export class VIEWS extends _VIEWSAspect(__.Entity) {}
Object.defineProperty(VIEWS, 'name', { value: 'VIEWS' })
Object.defineProperty(VIEWS, 'is_singular', { value: true })
export class VIEWS_ extends Array<VIEWS> {$count?: number}
Object.defineProperty(VIEWS_, 'name', { value: 'VIEWS' })

export function _TABLESAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TABLES extends Base {
        declare SCHEMA_NAME?: string | null;
        declare TABLE_NAME?: string | null;
        declare TABLE_OID?: number;
        declare COMMENTS?: string | null;
        declare columns?: __.Association.to.many<TABLE_COLUMNS_>;
        declare keys?: __.Association.to.many<INDEX_COLUMNS_>;
      declare static readonly actions: Record<never, never>
  };
}
export class TABLES extends _TABLESAspect(__.Entity) {}
Object.defineProperty(TABLES, 'name', { value: 'TABLES' })
Object.defineProperty(TABLES, 'is_singular', { value: true })
export class TABLES_ extends Array<TABLES> {$count?: number}
Object.defineProperty(TABLES_, 'name', { value: 'TABLES' })

export function _INDEX_COLUMNSAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class INDEX_COLUMNS extends Base {
        declare SCHEMA_NAME?: string | null;
        declare TABLE_NAME?: string | null;
        declare TABLE_OID?: number;
        declare INDEX_NAME?: string | null;
        declare INDEX_OID?: number | null;
        declare CONSTRAINT?: string | null;
        declare COLUMN_NAME?: string;
        declare POSITION?: _cds_hana.SMALLINT | null;
        declare ASCENDING_ORDER?: string | null;
      declare static readonly actions: Record<never, never>
  };
}
export class INDEX_COLUMNS extends _INDEX_COLUMNSAspect(__.Entity) {}
Object.defineProperty(INDEX_COLUMNS, 'name', { value: 'INDEX_COLUMNS' })
Object.defineProperty(INDEX_COLUMNS, 'is_singular', { value: true })
export class INDEX_COLUMNS_ extends Array<INDEX_COLUMNS> {$count?: number}
Object.defineProperty(INDEX_COLUMNS_, 'name', { value: 'INDEX_COLUMNS' })

export function _OBJECTSAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class OBJECTS extends Base {
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
Object.defineProperty(OBJECTS, 'name', { value: 'OBJECTS' })
Object.defineProperty(OBJECTS, 'is_singular', { value: true })
export class OBJECTS_ extends Array<OBJECTS> {$count?: number}
Object.defineProperty(OBJECTS_, 'name', { value: 'OBJECTS' })
