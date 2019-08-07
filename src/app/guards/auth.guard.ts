import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AppAuthenticationService} from '../services/app-authentication.service';
import {flatMap, map, tap} from 'rxjs/operators';
import {from, Observable, of} from 'rxjs';
import {StorageService} from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AppAuthenticationService, private router: Router) {
    }

    // tslint:disable-next-line:max-line-length
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const url: string = state.url;
        return from(StorageService.loading)
            .pipe(flatMap(_ =>  this.auth.isAuthenticated()
                .pipe(tap(el => {
            if (!el) {
                this.auth.redirectUrl = url;
                this.router.navigate(['/public/sign-up']);
            }
            return el;
        }))));

        // return true;
    }


}
