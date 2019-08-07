import { Area } from '../services/openapi';

export class MapOpened {
    constructor(public area: Area) {

    }

    static readonly type = '[Application] Map is opened';
}
