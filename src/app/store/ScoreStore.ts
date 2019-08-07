import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { CaughtOrganism } from './TagStore';
import { PlayersApiClient } from '../services/openapi';
export class ScoreStateModel {
    score: number;
}

@State<ScoreStateModel>({
    name: 'acquiredScore',
    defaults: {score: 0}
})
export class ScoreState {

    @Selector()
    static score({score}: ScoreStateModel) {
         return score;
    }

    constructor(private store: Store, private playersApiClient: PlayersApiClient) { }


    @Action(CaughtOrganism)
    onCaughtOrganism({setState, getState}: StateContext<ScoreStateModel>, {organism}: CaughtOrganism) {
        const {score: currentScore} = getState();
        var newScore = currentScore + 10;
        this.playersApiClient.playersMePut({points: newScore}).subscribe(value => {});
        // puntenbadge functie uit badgestore aanroepen

        return setState({score: newScore});
    }
}
