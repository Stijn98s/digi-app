import {State, Action, StateContext, Selector, Store} from '@ngxs/store';
import { ToastService } from '../services/toast.service';

export class LogStateModel {
    lastDateLoggedIn: Date;
    daysPlayed: number;
}

export class SetLastLogin {
    static readonly type = '[Log] Set latest login';

    constructor() {}
}

@State<LogStateModel>({
    name: 'Logs',
    defaults: {
        daysPlayed: 0,
        lastDateLoggedIn: new Date(),
    }
})

export class LogState {
    constructor() {
    }

    @Selector()
    static daysPlayed(logs: LogStateModel) {
        return logs.daysPlayed;
    }

    
    @Action(SetLastLogin)
    setLastLogin(logStateModel: StateContext<LogStateModel>) {
        let {daysPlayed, lastDateLoggedIn} = logStateModel.getState();
        logStateModel.setState({lastDateLoggedIn: new Date(), daysPlayed })
    }
}
