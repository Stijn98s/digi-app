import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from './services/openapi';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { IonicStorageModule } from '@ionic/storage';
import { NgxsAsyncStoragePluginModule } from '@ngxs-labs/async-storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { AccountState } from './store/AccountStore';
import { SettingsState, SettingStateModel } from './store/SettingsStore';
import { BadgesState} from './store/BadgeStore';
import { OrganismState } from './store/OrganismStore';
import { TagState } from './store/TagStore';
import { ScoreState } from './store/ScoreStore';
import { environment } from '../environments/environment';
import { StorageService } from './services/storage.service';
import { AppConfigurationService } from './services/app-configuration.service';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { CatchZoneState } from './store/CatchzoneStore';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { LogState } from './store/LogStore';
import {AppVersion} from '@ionic-native/app-version/ngx';
import { PlayerState } from './store/PlayerStore';
import { PipesModule } from './pipes/pipes.module';
import { AreaState } from './store/AreaStore';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // tslint:disable-next-line:max-line-length
    NgxsModule.forRoot([AccountState, SettingsState, AreaState, OrganismState, TagState, BadgesState, CatchZoneState, ScoreState, LogState, PlayerState], { developmentMode: !environment.production }),
    NgxsAsyncStoragePluginModule.forRoot(StorageService),
    IonicStorageModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    PipesModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      maxOpened: 1,
      timeOut: 5000
    }),
    ApiModule.forRoot(() => new AppConfigurationService)
  ],
  providers: [
    AppVersion,
    StatusBar,
    SplashScreen,
    Geolocation,
    Vibration,
    NativeAudio,
    DeviceOrientation,
    SettingStateModel,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
