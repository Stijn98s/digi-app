import {State, Action, StateContext, Selector, Store} from '@ngxs/store';
import {BadgesState} from './BadgeStore';
import { PlayersApiClient } from '../services/openapi';
import { state } from '@angular/animations';


export class UpdateSettings {
    static readonly type = '[Settings] Change Settings';
    constructor(public settings: SettingStateModel ) {}
}

export class SettingStateModel {
    seeable: boolean;
    volumeOn: boolean ;
    pushNotifications: boolean;
    vibrations: boolean;
    daysPlayed: number;
    profilePicUrl: string;
}



@State<SettingStateModel>({
    name: 'settings',
    defaults: {
        seeable: true,
        pushNotifications: true,
        vibrations: true,
        volumeOn: true,
        daysPlayed: 0,
        profilePicUrl: '/assets/img/profilepictures/1.png'
    }
})

export class SettingsState {

    constructor(private playersApiClient: PlayersApiClient) {
    }

    @Selector()
    static setting(settings: SettingStateModel) {
        return settings;
    }

    @Selector()
    static profilepic(state: SettingStateModel) {
        return state.profilePicUrl;
    }

    @Action(UpdateSettings)
    public changeSettings({patchState}: StateContext<SettingStateModel>, {settings}: UpdateSettings ) {
        if (settings.profilePicUrl != null) {
            this.playersApiClient.playersMePut({image: settings.profilePicUrl}).subscribe(value => {});
        }
        return patchState(settings);
    }
}
