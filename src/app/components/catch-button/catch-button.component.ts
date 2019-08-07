import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CatchZone} from '../../services/openapi';

@Component({
    selector: 'app-catch-button',
    templateUrl: './catch-button.component.html',
    styleUrls: ['./catch-button.component.scss'],
})
export class CatchButtonComponent implements OnChanges {

    @Input() catchZone: CatchZone;
    private animalName: string;

    constructor() {
    }


    ngOnChanges(changes: SimpleChanges): void {

        if (this.catchZone) {
            const {organisms} = this.catchZone;
            const randomValue = organisms[Math.floor(Math.random() * organisms.length)];
            if (randomValue) {
                this.animalName = randomValue.name;
            }
        }
    }

}
