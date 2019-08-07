import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AppAuthenticationService} from '../services/app-authentication.service';
import {flatMap, map, tap} from 'rxjs/operators';
import {from, Observable, of} from 'rxjs';
import {StorageService} from '../services/storage.service';
import { Store, Select } from '@ngxs/store';
import { Area } from '../services/openapi';
import { AreaState } from '../store/AreaStore';

@Injectable({
    providedIn: 'root'
})
export class AreaGuard implements CanActivate {

    @Select(AreaState.currentArea)
    public area$: Observable<Area>;

    constructor(private router: Router, private store: Store) {
    }

    // tslint:disable-next-line:max-line-length
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.store.selectSnapshot(AreaState.currentArea) !== null) {
            this.router.navigate(['/map']);
            return false;
        }

        return true;
    }
}
