import {State, Action, StateContext, Selector, Store} from '@ngxs/store';
import {CatchZone, Organism, Tag} from '../services/openapi';
import {ToastService} from '../services/toast.service';
import _ from 'lodash';
import {getCauthOrganismMessage} from '../constants';
import {CatchZoneState} from './CatchzoneStore';
import {Observable} from 'rxjs';

export class TagStateModel {
    tags: {
        [s: string]: {
            tag: Tag,
            caught: string[],
            toCatch: string[]
        }
    };
}

export class NewOrganisms {
    static readonly type = '[Tag] Verify new organisms tags';
    public newOrganisms: Organism[];

    constructor(...payload: Organism[]) {
        this.newOrganisms = payload;
    }
}

export class CaughtOrganism {
    static readonly type = '[Tag] Verify caught organism tags';

    constructor(public organism: Organism, public currentCatchzone$: CatchZone) {

    }
}




@State<TagStateModel>({
    name: 'tags',
    defaults: {tags: {}}
})
export class TagState {

    @Selector()
    static tags({tags}: TagStateModel):  { notCaught: string[]; caught: string[]; toCatch: string[]; tag: Tag }[]  {
        return Object.values(tags).map(value => ({
            ...value,
            notCaught: value.toCatch.filter(value1 => value.caught.indexOf(value1) === -1)
        }));
    }

    constructor(private toastService: ToastService,
                private store: Store) {
    }


    @Action(NewOrganisms)
    addOrganisms({setState, getState}: StateContext<TagStateModel>, {newOrganisms}: NewOrganisms) {
        const currentTags = _.clone(getState().tags);
        newOrganisms.forEach(newOrganism => {
            newOrganism.tags.forEach(newOrganismTag => {
                if (currentTags[newOrganismTag.name] === undefined) {
                    currentTags[newOrganismTag.name] = {
                        tag: newOrganismTag,
                        caught: [],
                        toCatch: []
                    };
                }

                if (!currentTags[newOrganismTag.name].toCatch.includes(newOrganism.name)) {
                    currentTags[newOrganismTag.name].toCatch.push(newOrganism.name);
                    currentTags[newOrganismTag.name].tag = newOrganismTag;
                }
            });
        });
        return setState({tags: currentTags});
    }


    @Action(CaughtOrganism)
    onCaughtOrganism({setState, getState, dispatch}: StateContext<TagStateModel>, {organism}: CaughtOrganism) {

        const currentTags = _.cloneDeep(getState().tags);
        organism.tags.forEach(tag => {
            const badge = currentTags[tag.name];
            if (badge.toCatch.includes(organism.name) && !badge.caught.includes(organism.name)) {
                badge.caught.push(organism.name);
            }
            if (badge.toCatch.length === badge.caught.length) {
                this.toastService.addQuickNotification(getCauthOrganismMessage(badge.tag.name), '../../assets/img/badgeIcon.png');
            }
        });

        return setState({tags: currentTags});
    }
}
