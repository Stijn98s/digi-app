import {State, Selector, Action, StateContext} from '@ngxs/store';
import {IncrementalApiClient, Organism} from '../services/openapi';
import {CaughtOrganism, NewOrganisms} from './TagStore';
import {EntityStateModel} from './EntityStateModel';
import {map} from 'rxjs/operators';
import {EntityState} from './EntityState';
import {MapOpened} from './ApplicationEvents';
import _ from 'lodash';


export class OrganismStateModel extends EntityStateModel<Organism> {
    caughtOrganisms: {
        [s: string]: number
    };
}

export interface OrganismCaught extends Organism {
    timesCaught: number;
}


@State<OrganismStateModel>({
    name: 'organism',
    defaults: {
        entities: [],
        caughtOrganisms: {}
    }
})
export class OrganismState extends EntityState<Organism> {

    @Selector()
    static entities(state: OrganismStateModel) {
        return state.entities.map(value => {
            const entity = _.clone(value) as OrganismCaught;
            entity.timesCaught = state.caughtOrganisms[value.name] || 0;
            return entity;
        }) || [];
    }


    @Selector()
    static uncaught(state: OrganismStateModel) {
        return OrganismState
            .entities(state)
            .filter(organism => organism.timesCaught === 0);
    }

    @Selector()
    static caught(state: OrganismStateModel) {
        return OrganismState
            .entities(state)
            .filter(organism => organism.timesCaught > 0);
    }


    @Selector()
    static organismByID(state: OrganismStateModel) {
        return (organismName) => {
            return state.entities.find(organism => organism.name === organismName);
        };
    }

    constructor(private increment: IncrementalApiClient) {
        super();
    }

    @Action(MapOpened)
    getAllOrganism({dispatch, setState, getState, patchState}: StateContext<OrganismStateModel>, {}: MapOpened) {
        const state = getState();
        const lastFetched = this.latestUpdate(state) as any;

        this.increment.incrementalOrganismGet(lastFetched)
            .pipe(map(this.extractModifications(state)))
            .subscribe(({newEntities, entities, editedEntities}) => {
                const {caughtOrganisms} = state;
                const upsertedOrganisms = [...newEntities, ...editedEntities];
                
                setState({caughtOrganisms, entities});
                if (upsertedOrganisms.length > 0) {
                    dispatch(new NewOrganisms(...upsertedOrganisms));
                }
            });
    }
    
    @Action(CaughtOrganism)
    onCaughtOrganism({setState, getState, patchState}: StateContext<OrganismStateModel>, {organism}: CaughtOrganism) {
        const caughtOrganisms = _.clone(getState().caughtOrganisms);
        if (caughtOrganisms[organism.name] === undefined) {
            caughtOrganisms[organism.name] = 0;
        }
        caughtOrganisms[organism.name]++;
        return patchState({caughtOrganisms: caughtOrganisms});
    }
}
