import {State, Selector, Action, StateContext} from '@ngxs/store';
import {IncrementalApiClient, Area} from '../services/openapi';
import {EntityStateModel} from './EntityStateModel';
import {map} from 'rxjs/operators';
import {EntityState} from './EntityState';

export class AreaStateModel extends EntityStateModel<Area> {
    currentArea!: Area;
    firstTime: boolean;
}

export class FetchAreas {
    constructor() {

    }

    static readonly type = '[Area] Fetch areas';
}

export class LeftArea {
    constructor() {

    }

    static readonly type = '[Area] Left area';
}

export class EnteredArea {
    constructor(public area: Area) {

    }

    static readonly type = '[Area] Entered area';
}

@State<AreaStateModel>({
    name: 'area',
    defaults: {entities: [], currentArea: null, firstTime: true}
})
export class AreaState  extends EntityState<Area> {

    @Selector()
    static currentArea(state: AreaStateModel): Area {
        return state.currentArea;
    }

    @Selector()
    static currentAreaName(state: AreaStateModel) {
        return state.currentArea.name;
    }

    @Selector()
    static areas(state: AreaStateModel) {
        return state.entities;
    }

    constructor(private increment: IncrementalApiClient) {
        super();
    }


    @Action(EnteredArea)
    enteredCatchZone({setState, getState, patchState}: StateContext<AreaStateModel>, {area}: EnteredArea) {
        return patchState({currentArea: area});
    }

    @Action(LeftArea)
    leftCatchZone({setState, getState, patchState}: StateContext<AreaStateModel>, {}: LeftArea) {
        return patchState({currentArea: null});
    }

    @Action(FetchAreas)
    getAll({getState, patchState}: StateContext<AreaStateModel>, {}: FetchAreas) {
        const state = getState();
        const lastFetched = this.latestUpdate(state) as any;

        this.increment.incrementalAreaGet(lastFetched)
            .pipe(map(this.extractModifications(state)))
            .subscribe(({entities}) => {
                patchState({entities});
                if (state.firstTime === true) {
                    patchState({currentArea: entities[0], firstTime: false});
                }
            });
    }

}
