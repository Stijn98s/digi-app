import {Injectable, Optional} from '@angular/core';

import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Configuration} from './openapi';
import {AccountState, AuthStateModel} from '../store/AccountStore';



@Injectable({
    providedIn: 'root',

})
export class AppConfigurationService extends Configuration {
    @Select(AccountState) state: Observable<AuthStateModel>;


    constructor() {
        super({
            basePath: 'https://megain.xyz:4000',
            apiKeys: {'Authorization': () => {
                let token = '';
                this.state.subscribe(el => token = el.token);
                return `Bearer ${token}`;
            }}
        });
    }
}
