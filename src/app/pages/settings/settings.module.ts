import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SettingsPage} from './settings.page';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import { ProfilepictureComponent } from 'src/app/components/profilepicture/profilepicture.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsPage
    }
];

@NgModule({
    entryComponents: [
        ProfilepictureComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NgxsFormPluginModule.forRoot(),
        RouterModule.forChild(routes),
        ReactiveFormsModule

    ],
    declarations: [SettingsPage,ProfilepictureComponent]
})
export class SettingsPageModule {
}
