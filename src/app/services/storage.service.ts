import {Injectable} from '@angular/core';
import {AsyncStorageEngine} from '@ngxs-labs/async-storage-plugin';
import {from, Observable} from 'rxjs';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StorageService implements AsyncStorageEngine {
    public static loading: Promise<any>;
    private doneLoading: (value?: (PromiseLike<any> | any)) => void;


    constructor(private storage: Storage, private appVersion: AppVersion) {
        if(!environment.storageEnabled){
            storage.clear();
        }
        StorageService.loading = new Promise(res => {this.doneLoading = res; }).then(res => console.log('done Loading storage from db'));
    }

    length(): Observable<number> {
        return from(this.storage.length());
    }

    getItem(key: any): Observable<any> {
        return from(this.storage.get(key).then(res => {
            this.doneLoading('done');
            return res;
        }));
    }

    async setItem(key: any, val: any): Promise<void> {

        await this.storage.set(key, val);
    }

    async removeItem(key: any): Promise<void> {
        await this.storage.remove(key);
    }

    async clear(): Promise<void> {
        await this.storage.clear();
    }

    key(val: number): Observable<string> {
        return from(this.storage.keys().then(keys => keys[val]));
    }

}
