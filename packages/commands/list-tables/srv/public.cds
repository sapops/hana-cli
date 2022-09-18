using { TABLES as tables } from '../db/cds/tables';
service public {    
    entity TABLES as projection on tables;    
}