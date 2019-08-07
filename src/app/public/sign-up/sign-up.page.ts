import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AppAuthenticationService} from '../../services/app-authentication.service';
import {AlertService} from '../../services/alert.service';
import {usernameUsedMessage} from '../../constants';


function passwordConfirming(c: AbstractControl): any {
    if (!c.parent || !c) {
        return;
    }
    const pwd = c.parent.get('password');
    const cpwd = c.parent.get('passwordRepeated');

    if (!pwd || !cpwd) {
        return;
    }
    if (pwd.value !== cpwd.value) {
        return {invalid: true};
    }
}

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {


    signUpFg = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[^\s]+$/)]),
    },);


    constructor(private alertService: AlertService, private auth: AppAuthenticationService) {
    }

    ngOnInit() {
    }

    async signUp() {
        try {
            const {username} = this.signUpFg.value;
            await this.auth.signUp({name: username.toLowerCase()}, 'home');
        } catch (e) {
            if (e.status === 409) {
                await this.alertService.showError(usernameUsedMessage);
            } else {
                await this.alertService.showError(e.error.message || 'Er is een probleem voorgekomen, probeer het opnieuw');
            }
        }
    }
}
