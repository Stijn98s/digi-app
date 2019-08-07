import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Vibration} from '@ionic-native/vibration/ngx';
import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../services/toast.service';
import {OrganismState} from '../../store/OrganismStore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CatchZone, Organism} from '../../services/openapi';
import {Store} from '@ngxs/store';
import {CaughtOrganism} from '../../store/TagStore';
import {Router} from '@angular/router';
import {NativeAudio} from '@ionic-native/native-audio/ngx';
import {AudioService} from '../../services/audio.service';
import {SettingsState} from '../../store/SettingsStore';
import {ScratchCard, SCRATCH_TYPE} from 'scratchcard-js';
import {animalCaughtMessage} from '../../constants';
import { NavController} from '@ionic/angular';
import {CatchZoneState} from '../../store/CatchzoneStore';
@Component({
    selector: 'app-catch',
    templateUrl: './catch.page.html',
    styleUrls: ['./catch.page.scss'],
})
export class CatchPage implements OnInit {
    public background: any;
    private name: string;
    public organism$: Observable<Organism>;
    public lens: any;
    public flash: any;
    private catchZone: CatchZone;



    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private toast: ToastService,
        private store: Store,
        private router: Router,
        private vibration: Vibration,
        private nativeAudio: NativeAudio,
        private audio: AudioService,
        private ionicNavi:NavController
    ) {
        this.name = this.route.snapshot.params.id;
        this.organism$ = this.store.select(OrganismState.organismByID).pipe(map(filterFn => filterFn(this.name)));
        this.audio.preload('cameraSound', 'assets/audio/cameraSound.mp3');
        this.audio.preload('win', 'assets/audio/win.mp3');
    }

    ngOnInit() {
        this.catchZone = this.store.selectSnapshot(CatchZoneState.currentCatchzone);
        this.scratch();
    }

    private scratch() {
        let frontImage = '../../../assets/img/leaves.png';
        const sc = new ScratchCard('#scratch', {
            scratchType: SCRATCH_TYPE.CIRCLE,
            containerWidth: 1100,
            containerHeight: 700,
            imageForwardSrc: frontImage,
            clearZoneRadius: 40,
            imageBackgroundSrc: null,
            nPoints: 30,
            pointSize: 4,
            callback: function () {
            },
            percentToFinish: 95,
        });
        sc.init().then(() => {
            sc.canvas.addEventListener('scratch.move', () => {
                if (sc.getPercent() > 30) {
                    this.lens = 'lens';
                }
            });
        }).catch((error) => {
            alert(error.message);
        });
    }

    async onCaughtAction(organism: Organism): Promise<void> {
        this.flash = 'overlay';
        const settingStateModel = this.store.selectSnapshot(SettingsState.setting);

        if (settingStateModel.volumeOn) {
            this.audio.play('cameraSound');
        }
        if (settingStateModel.vibrations) {
            this.vibration.vibrate(1000);
        }

        this.toast.runQueue();

        let url = '../../../assets/img/badgeIcon2.png';
        this.toast.addQuickNotification(animalCaughtMessage(this.name), url);

        this.store.dispatch(new CaughtOrganism(organism, this.catchZone));

        setTimeout(async () => {
            this.router.navigate(['/collection'], {replaceUrl: true});
            this.flash = '';
            if (settingStateModel.volumeOn) {
                (this.audio.play('win'));
            }
        }, 1000);
    }
}
