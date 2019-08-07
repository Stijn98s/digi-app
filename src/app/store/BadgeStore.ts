import {State, Action, StateContext, Selector, Store} from '@ngxs/store';
import {ToastService} from '../services/toast.service';
import {Login, SignUp} from './AccountStore';
import {Badge} from '../services/openapi/model/badge';
import {sameDay} from '../../utils/handy';
import {SetLastLogin, LogStateModel} from './LogStore';
import _ from 'lodash';
import {daysPlayedBadgeMessageName, daysPlayedDescription} from '../constants';

export class BadgeStateModel {
    badges: {
        [s: string]: {
            badge: Badge
        }
    };
}

@State<BadgeStateModel>({
    name: 'Badges',
    defaults: {
        badges: {}
    }
})

export class BadgesState {
    constructor(private store: Store) {
    }

    addBadge(
        badges: { [p: string]: { badge: Badge } },
        key: string,
        name: string,
        description: string,
        points: number
    ) {
        const badge = <Badge>{
            name: name,
            description: description,
            points: points
        };

        badges[key] = {
            badge: badge
        };

        return badges;
    }

    addDPBadge(badges: { [p: string]: { badge: Badge } }, daysplayed: number, points: number) {
        return this.addBadge(
            badges,
            'dgbadge' + daysplayed,
            daysPlayedBadgeMessageName,
            daysPlayedDescription(daysplayed),
            points
        );
    }


    @Selector()
    static daysPlayed(logs: LogStateModel) {
        return logs.daysPlayed;
    }

    @Action(Login)
    setDaysPlayedBadge(badgeStateModel: StateContext<BadgeStateModel>) {
        let {lastDateLoggedIn, daysPlayed} = this.store.selectSnapshot(BadgesState);
        const badges = _.clone(badgeStateModel.getState().badges);
        let daysPlayedCount, points: number;
        console.log(lastDateLoggedIn);
        if (sameDay(new Date(lastDateLoggedIn), new Date())) {
            daysPlayed++;
        }


        switch (true) {
            case (daysPlayed >= 7 && daysPlayed < 14):
                daysPlayedCount = 7;
                points = 10;
                break;
            case (daysPlayed >= 14 && daysPlayed < 30):
                daysPlayedCount = 14;
                points = 20;
                break;
            case (daysPlayed >= 30):
                daysPlayedCount = 31;
                points = 30;
                break;
        }

        this.addDPBadge(badges, daysPlayedCount, points);
        badgeStateModel.setState({badges: badges});
        badgeStateModel.dispatch(new SetLastLogin());
    }
}
