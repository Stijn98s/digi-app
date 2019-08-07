import {State, Selector, Action, StateContext, Store} from '@ngxs/store';
import {IncrementalApiClient, Player, PlayersApiClient} from '../services/openapi';
import {EntityStateModel} from './EntityStateModel';
import {EntityState} from './EntityState';
import {AccountState} from './AccountStore';
import {ToastService} from '../services/toast.service';


export class PlayerStateModel extends EntityStateModel<Player> {
    friends: {
        [s: string]: boolean
    };
}

export class AddedFriend {
    static readonly type = '[Player] Add to friendlist';

    constructor(public friend: string) {

    }
}

export class RefreshPlayer {
    static readonly type = '[Player] Refresh Players';
}

@State<PlayerStateModel>({
    name: 'player',
    defaults: {
        entities: [],
        friends: {}
    }
})
export class PlayerState  {


    constructor(private playerClient: PlayersApiClient, private store: Store, private increment: IncrementalApiClient, private toastService: ToastService) {

    }

    @Selector()
    static entities(state: PlayerStateModel) {
        return state.entities;
    }

    @Selector()
    static playerByID(state: PlayerStateModel) {
        return (playerName) => {
            return state.entities.find(player => player.name === playerName);
        };
    }

    @Action(RefreshPlayer)
    getAllPlayers({dispatch, setState, getState}: StateContext<PlayerStateModel>, {}: RefreshPlayer) {
        const state = getState();

        this.increment.incrementalPlayersGet()
            .subscribe((entities) => {
                setState({...state, entities});
            });
    }
    @Action(AddedFriend)
    addedFriend({setState, getState, patchState, dispatch}: StateContext<PlayerStateModel>, {friend}: AddedFriend) {
        const username = this.store.selectSnapshot(AccountState.username);
        this.playerClient.playersIdFriendsFriendPost(friend, username).subscribe(value => {
            dispatch(new RefreshPlayer());
        }, (error) => {
            this.toastService.addQuickNotification('De naam ' + friend + ' bestaat niet');
        });
    }
}
