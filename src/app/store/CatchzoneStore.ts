import {State, Selector, Action, StateContext} from '@ngxs/store';
import {CatchZone, IncrementalApiClient} from '../services/openapi';
import {EntityStateModel} from './EntityStateModel';
import {MapOpened} from './ApplicationEvents';
import {map} from 'rxjs/operators';
import {EntityState} from './EntityState';
import {ToastService} from '../services/toast.service';
import {catchzoneMessage, getCauthOrganismMessage} from '../constants';
import {CaughtOrganism, TagStateModel} from './TagStore';
import _ from 'lodash';


export class CatchZoneStateModel extends EntityStateModel<CatchZone> {
    currentCatchZone!: CatchZone;
    caughtCatchZones!: [number, string][];
}

export class LeftCatchZone {
    constructor() {

    }

    static readonly type = '[CatchZone] Left catchzone ';
}

export class EnteredCatchZone {
    constructor(public catchZone: CatchZone) {

    }

    static readonly type = '[CatchZone] Entered catchzone ';
}


@State<CatchZoneStateModel>({
    name: 'catchZone',
    defaults: {entities: [], currentCatchZone: null, caughtCatchZones: []}
})
export class CatchZoneState extends EntityState<CatchZone> {

    @Selector()
    static currentCatchzone(state: CatchZoneStateModel): CatchZone {
        return state.currentCatchZone;
    }


    @Selector()
    static catchZones(state: CatchZoneStateModel) {
        const d = new Date();
        const yesterday = d.setDate(d.getDate() - 1);
        const caugtThisDay = _.cloneDeep(state.caughtCatchZones)
            .filter(([time, key]) => time > d.getTime());
        const catchZones = state.entities.filter(value =>
            !caugtThisDay.some(([time, key]) => key === value.name));
        return catchZones;
    }

    constructor(private increment: IncrementalApiClient, private toastService: ToastService) {
        super();
    }


    @Action(EnteredCatchZone)
    enteredCatchZone({setState, getState, patchState}: StateContext<CatchZoneStateModel>, {catchZone}: EnteredCatchZone) {
        this.toastService.addQuickNotification(catchzoneMessage(catchZone.name), '../../assets/img/catch_zone.png');
        return patchState({currentCatchZone: catchZone});
    }

    @Action(LeftCatchZone)
    leftCatchZone({setState, getState, patchState}: StateContext<CatchZoneStateModel>, {}: LeftCatchZone) {
        return patchState({currentCatchZone: null});
    }

    @Action(MapOpened)
    getAllOrganism({getState, patchState}: StateContext<CatchZoneStateModel>, {area}: MapOpened) {
        patchState({entities: []});
        const state = _.cloneDeep(getState());
        const lastFetched = this.latestUpdate(state) as any;
        // @ts-ignore
        this.increment.incrementalCatchzoneGet(lastFetched, ['area:' + area.id])
            .pipe(map(this.extractModifications(state)))
            .subscribe(({entities}) => {
                patchState({entities});
            });
    }


    @Action(CaughtOrganism)
    onCaughtOrganism({setState, getState, dispatch, patchState}: StateContext<CatchZoneStateModel>, {currentCatchzone$}: CaughtOrganism) {
        const {caughtCatchZones = [], currentCatchZone, entities} = getState();
        const zones = _.cloneDeep(caughtCatchZones);
        zones.push([new Date().getTime(), currentCatchzone$.name]);
        patchState({caughtCatchZones: zones, entities});
        dispatch(new LeftCatchZone());
    }

}
