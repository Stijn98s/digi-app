import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {header, btnText} from '../constants';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    async showError(message: string) {


        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: [btnText]
        });

        await alert.present();
    }

    constructor(private alertController: AlertController) {
    }
}
