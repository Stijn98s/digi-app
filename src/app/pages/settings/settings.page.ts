import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {SettingsState, UpdateSettings} from '../../store/SettingsStore';
import {Observable, Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {AccountState} from '../../store/AccountStore';
import {BadgesState} from '../../store/BadgeStore';
import { LeftArea, AreaState } from 'src/app/store/AreaStore';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CatchButtonComponent } from '../../components/catch-button/catch-button.component';
import { ProfilepictureComponent } from 'src/app/components/profilepicture/profilepicture.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {


    public settingsForm = this.formBuilder.group({
        seeable: null,
        pushNotifications: null,
        vibrations: null,
        volumeOn: null,
    });

    @Select(AccountState.username)
    public userName$: Observable<string>;

    @Select(AreaState.currentAreaName)
    public areaName$: Observable<string>;

    @Select(BadgesState.daysPlayed)
    public daysPlayed$: Observable<number>;

    @Select(SettingsState.profilepic)
    public profilePic$: Observable<string>;

    @Select(SettingsState)
    public settingsState$: Observable<any>;
    private subscription: Subscription;
    private subscription2: Subscription;


  constructor(private formBuilder: FormBuilder, private store: Store, private router: Router, public popoverController: PopoverController) {
  }

  ngOnInit() {
      this.subscription2 = this.settingsState$.pipe(first()).subscribe(value => {
          this.settingsForm.patchValue(value);
      });


      this.subscription = this.settingsForm.valueChanges.subscribe(value => {
         this.store.dispatch(new UpdateSettings(value));
      });

  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ProfilepictureComponent,
      event: ev,
      translucent: false
    });
    return await popover.present();
  }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
    }

    leaveArea() {
        this.store.dispatch(new LeftArea());
        this.router.navigate(['/area']);
    }
}
