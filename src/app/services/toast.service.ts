import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Tag, Organism } from './openapi';
import { ToastrService } from 'ngx-toastr';
import {headingDistanceTo} from 'geolocation-utils';


@Injectable({
  providedIn: 'root'
})

export class ToastService {

  private toastOptions = {
    toastClass: 'badgeToast',
    tapToDismiss: true,
    messageClass:'badgeToastMessage',
    titleClass: 'badgeToastTitle',
    positionClass: 'center',
    enableHtml: true,
    easing: 'ease-in',
    easeTime: 400,
  }

  constructor(private toastr: ToastrService) { }
  
  notifications: {
      message: string,
      imgURL: string
  }[] = new Array<{
    message: string,
    imgURL: string
  }>();

  public addNotification(message: string, imgURL: string) {
    const notification = {
      message: message,
      imgURL: imgURL
    };

    if (!this.notifications)
      this.notifications = [notification];
    else
      this.notifications.push(notification);
  }

  public async addQuickNotification(message: string, imgURL?: string) {
    this.addNotification(message, imgURL);
    await this.runQueue();
  }

  async runQueue(context = null) {
    if (!context) {
      context = this;
    }

    const notification = context.notifications.pop();

    if (!notification)
      return;
    let message;

    if(notification.imgURL){
      message = `<img src="${notification.imgURL}" alt="badgeImage">`;
    }
    this.toastr.show(message, notification.message, this.toastOptions);

    if (context.notifications.length > 0) {
      setTimeout(function() {
        context.runQueue(context);
      }, 1500);
    }
  }
}
