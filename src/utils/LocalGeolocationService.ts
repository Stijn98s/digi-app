import {Geolocation, GeolocationOptions, Geoposition} from '@ionic-native/geolocation/ngx';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class LocalGeolocationService implements Geolocation {
    constructor(public plt: Platform) {

    }

    getCurrentPosition(options?: GeolocationOptions): Promise<Geoposition> {
        return undefined;
    }


    subPos(subscriber){
        navigator.geolocation.getCurrentPosition((location) => {
            subscriber.next(location);
        }, (err) => console.log(err), {enableHighAccuracy: true});
    }

    watchPosition(options?: GeolocationOptions): Observable<Geoposition> {
        if (this.plt.is("ios")) {
            return new Observable<Geoposition>(subscriber => {
                setInterval(()=> this.subPos(subscriber), 1)
            });
        } else {
            return new Observable<Geoposition>(subscriber => {
                navigator.geolocation.watchPosition(location => {
                    console.log(location);
                    subscriber.next(location);
                }, (err) => {
                    console.log(err);
                }, options);
            });
        }

    }

}
