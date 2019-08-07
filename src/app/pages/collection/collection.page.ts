import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {OrganismCaught, OrganismState} from 'src/app/store/OrganismStore';
import { Observable, of } from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import { Organism } from 'src/app/services/openapi';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage {


  @Select(OrganismState.uncaught)
  public unCaughtOrganisms$: Observable<OrganismCaught[]>;
  @Select(OrganismState.caught)
  private caughtOrganisms$: Observable<OrganismCaught[]>;

  constructor() { }
}
