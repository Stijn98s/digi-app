import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SettingsState, UpdateSettings } from 'src/app/store/SettingsStore';
import { Observable } from 'rxjs';
import {first} from 'rxjs/operators';
import { PlayerState } from 'src/app/store/PlayerStore';

@Component({
  selector: 'app-profilepicture',
  templateUrl: './profilepicture.component.html',
  styleUrls: ['./profilepicture.component.scss'],
})
export class ProfilepictureComponent implements OnInit {

@Select(SettingsState)
public settingsState$: Observable<any>;

@Select(PlayerState)
public playerState$: Observable<any>;

images: string[];
state: any;
  constructor(private store: Store) {
    this.images = [
      '/assets/img/profilepictures/1.png',
      '/assets/img/profilepictures/vos.png',
      '/assets/img/profilepictures/das.png',
      '/assets/img/profilepictures/hert.png',
      '/assets/img/profilepictures/konijn.png',
    ];
  }

  selectImage(image: string) {
    this.store.dispatch(new UpdateSettings(Object.assign({}, this.state, {profilePicUrl: image})));
    this.playerState$.subscribe(a=> console.log(a));
  }

  ngOnInit() {}

}
