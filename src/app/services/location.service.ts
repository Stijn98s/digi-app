import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {CatchZoneState, EnteredCatchZone, LeftCatchZone} from 'src/app/store/CatchzoneStore';
import {CatchZone} from './openapi';
import {Select, Store} from '@ngxs/store';
import {BehaviorSubject, combineLatest, fromEvent, Observable} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {ToastService} from './toast.service';
import {distinctUntilChanged, filter, map, share, tap} from 'rxjs/operators';
import {headingDistanceTo, normalizeHeading} from 'geolocation-utils';
import {LocalDeviceOrientation} from '../../utils/LocalDeviceOrientation';
import {LocalGeolocationService} from '../../utils/LocalGeolocationService';


@Injectable({
    providedIn: 'root'
})


export class LocationService {

    @Select(CatchZoneState.catchZones)
    private catchzones$: Observable<CatchZone[]>;
    public readonly deviceDegrees$: Observable<number>;
    public readonly location$: BehaviorSubject<Coordinates>;

    constructor(private geolocation: LocalGeolocationService,
                private toastController: ToastController,
                private deviceOrientation: LocalDeviceOrientation,
                private toastService: ToastService,
                private store: Store) {


        this.deviceDegrees$ = this.deviceOrientation.watchHeading({})
            .pipe(
                map(arr => arr.trueHeading),
                share());

        this.location$ = new BehaviorSubject<Coordinates>({
            altitude: undefined, altitudeAccuracy: undefined, heading: undefined, speed: undefined,
            latitude: 51.6978162,
            longitude: 5.3036748,
            accuracy: 50
        });

        this.geolocation
            .watchPosition({timeout: 30000})
            .pipe(
                tap(x => console.log(x)),
                map(value => value.coords),
                filter((p) => !!p),
            ).subscribe((val) => {this.location$.next(val)}, error1 => console.log(error1));

        this.closestWaypoint$
            .pipe(
                map(
                    ({heading, catchzone}) => {
                        return heading.distance < catchzone.radius ? catchzone : null;
                    }),
                distinctUntilChanged()
            ).subscribe(catchzone => {
            if (catchzone) {
                store.dispatch(new EnteredCatchZone(catchzone));
                return;
            }
            store.dispatch(new LeftCatchZone());
        });
    }

    get directionToClosestWaypoint$() {
        return combineLatest([this.closestWaypoint$.pipe(map(value => value.heading.heading)), this.deviceDegrees$])
            .pipe(
                map(([degreesToDestination, deviceDegrees]) => (normalizeHeading(normalizeHeading(degreesToDestination) - deviceDegrees))),
                map(value => value.toString())
            )
            ;
    }

    get closestWaypoint$() {
        return combineLatest([this.catchzones$.pipe(filter(value => value.length > 0)), this.location$.pipe(filter(value => !!value))])
            .pipe(
                map(([catchzones, location]) => {
                    return catchzones
                        .map((catchzone) => ({heading: headingDistanceTo(location, catchzone), catchzone}))
                        .sort((a, b) => a.heading.distance - b.heading.distance)[0];
                }),
            );
    }

}
