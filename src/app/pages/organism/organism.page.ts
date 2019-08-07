import { Component, OnInit } from '@angular/core';
import { OrganismState } from 'src/app/store/OrganismStore';
import { Observable } from 'rxjs';
import { Organism } from 'src/app/services/openapi';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-organism',
  templateUrl: './organism.page.html',
  styleUrls: ['./organism.page.scss'],
})
export class OrganismPage implements OnInit {

  public organism$: Observable<Organism>;

  public organismName: String;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.organism$ = this.store.select(OrganismState.organismByID).pipe(map(filterFn => filterFn(this.route.snapshot.params.id)));
  }

  ngOnInit() {
  }
}
