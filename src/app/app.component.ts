import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LocationService} from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Vangen en verzamelen',
      url: '/map',
      icon: 'search'
    },
    {
      title: 'Vrienden',
      url: '/list',
      icon: 'heart'
    },
    {
      title: 'Instellingen',
      url: '/list',
      icon: 'settings'
    },
    {
      title: 'Uitleg',
      url: '/tutorial',
      icon: 'help'
    },
    {
      title: 'Over',
      url: '/list',
      icon: 'information-circle-outline'
    }

  ];

  pageIsLogin;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private locationService: LocationService,
  ) {
    this.initializeApp();
    router.events.subscribe((url: any) => this.setIsLogin(url.url));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setIsLogin(url: string) {
    if (url === '/public/sign-up' || url === '/area') {
      this.pageIsLogin = true;
    } else if (url !== undefined) {
      this.pageIsLogin = false;
    }
  }

}
