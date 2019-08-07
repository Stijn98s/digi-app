import {DeviceOrientation, DeviceOrientationCompassHeading, DeviceOrientationCompassOptions} from '@ionic-native/device-orientation/ngx';
import {fromEvent, interval, Observable} from 'rxjs';
import {map, throttle} from 'rxjs/operators';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class LocalDeviceOrientation implements DeviceOrientation {
    getCurrentHeading(): Promise<DeviceOrientationCompassHeading> {
        return undefined;
    }

    watchHeading(options?: DeviceOrientationCompassOptions): Observable<DeviceOrientationCompassHeading> {
        return fromEvent(window, 'deviceorientation').pipe(map(value => {
                const orientation: DeviceOrientationCompassHeading = {
                    // @ts-ignore
                    trueHeading: -90 - value.alpha,
                    headingAccuracy: 0,
                    magneticHeading: 0,
                    timestamp: 0
                };
                return orientation;
            }),
            throttle(val => interval(30)));
    }

}
