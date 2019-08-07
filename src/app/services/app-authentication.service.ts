import {Injectable} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {AccountState, AuthStateModel, Login, SignUp} from '../store/AccountStore';
import {Observable, of} from 'rxjs';
import {AppSignUpDto, AuthenticationApiClient} from './openapi';
import {catchError, flatMap, map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AppAuthenticationService {


    redirectUrl?: string;

    @Select(AccountState) token$: Observable<AuthStateModel>;
    @Select(AccountState.isLoggedIn) isLoggedIn$: Observable<boolean>;

    constructor(private store: Store, private router: Router, private authApiClient: AuthenticationApiClient) {
    }


    isAuthenticated(): Observable<boolean> {
        return this.isLoggedIn$.pipe(flatMap(value => {
            if (!value) { return this.login(); }
            return of(true);
        }));
    }

    private async go(targetUrl= '/map') {
        await this.router.navigate([targetUrl]);
    }

    async signUp(signUpDto: AppSignUpDto, url: string) {
        const result = await this.authApiClient.authAppsignupPost(signUpDto).toPromise();
        await this.store.dispatch(new SignUp(result)).toPromise();
        await this.go(this.redirectUrl);
    }

     login() {
        let token: AuthStateModel;
        this.token$.subscribe(el => token = el);
        if (!token.password && !token.username) { return of(false); }
        return this.authApiClient
            .authApplocalPost({name: token.username, password: token.password})
            .pipe(map(({jwt}) => {
                this.store.dispatch(new Login({jwt}));
                return true;
                }))
            .pipe(catchError(error => {
                if (error.status === 401) {
                    return of(false);
                }
                return of(true);
            }));
    }
}
