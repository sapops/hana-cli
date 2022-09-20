using { VIEWS as SYS_VIEWS } from '../db/cds/SYS/VIEWS';

service public {
    entity VIEWS as projection on SYS_VIEWS;
}
