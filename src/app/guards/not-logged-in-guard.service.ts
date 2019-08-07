import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import {AppAuthenticationService} from '../services/app-authentication.service';
import {flatMap, map} from 'rxjs/operators';
import 'rxjs-compat/add/operator/concat';
import {StorageService} from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {

    constructor(private auth: AppAuthenticationService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return from(StorageService.loading).pipe(flatMap(_ => this.auth.isAuthenticated().pipe(map(value => {
            if (value) {
                this.router.navigate(['/home']);
                return false;
            }
            return true;
        }))));
    }


}
