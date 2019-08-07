import {Component} from '@angular/core';
import {Tag} from 'src/app/services/openapi';
import {Store, Select} from '@ngxs/store';
import {TagState} from 'src/app/store/TagStore';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-badges',
    templateUrl: './badges.page.html',
    styleUrls: ['./badges.page.scss'],
})
export class BadgesPage  {

    @Select(TagState.tags)
    public tags$: Observable< { notCaught: string[]; caught: string[]; toCatch: string[]; tag: Tag }[]  >;


}
