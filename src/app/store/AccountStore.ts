import {State, Action, StateContext, Selector} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {JWTDto, SignUpDto, User, AuthenticationApiClient, NewPlayerDto} from '../services/openapi';
import jwtDecode from 'jwt-decode';
import {Router} from '@angular/router';
import {MapOpened} from './ApplicationEvents';

export class AuthStateModel {
    token?: string;
    username?: string;
    password?: string;
}

export class Login {
    static readonly type = '[Auth] Login';

    constructor(public payload: JWTDto) {
    }
}

export class SignUp {
    static readonly type = '[Auth] SignUp';

    constructor(public payload: NewPlayerDto) {
    }
}


export class Logout {
    static readonly type = '[Auth] Logout';
}

@State<AuthStateModel>({
    name: 'account',
})

export class AccountState {
    @Selector()
    static token(state: AuthStateModel) {
        return state.token;
    }

    @Selector()
    static username(state: AuthStateModel) {
        return state.username;
    }


    @Selector()
    static isLoggedIn(state: AuthStateModel) {
        if (!state.password) { return false; }
        try {
            const decoded = jwtDecode(state.token);
            return !(decoded.exp < Date.now() / 1000);
        } catch (e) {
            return false;
        }
    }

    constructor(private authService: AuthenticationApiClient, private router: Router) {
    }

    @Action(SignUp)
    signUp({patchState}: StateContext<AuthStateModel>, {payload: {jwt, name, pass}}: SignUp) {
        return patchState({token: jwt, username: name, password: pass});
    }


    @Action(Login)
    login({patchState}: StateContext<AuthStateModel>, {payload: {jwt}}: Login) {
        return patchState({token: jwt});
    }

    @Action(Logout)
    logout({patchState}: StateContext<AuthStateModel>, logout: Logout) {
        return of(this.router.navigate(['/public/login'])).pipe(tap(x => {
            patchState({token: null});
        }));
    }


}
