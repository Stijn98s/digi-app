import { Component, OnInit } from '@angular/core';
import { AreaState, FetchAreas, EnteredArea } from 'src/app/store/AreaStore';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Area } from 'src/app/services/openapi';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-area',
  templateUrl: 'area.page.html',
  styleUrls: ['area.page.scss'],
})
export class AreaPage implements OnInit {

  @Select(AreaState.areas)
  public areas$: Observable<Area[]>;

  @Select(AreaState.currentArea)
  public area$: Observable<Area>;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchAreas());

    this.area$.subscribe((res) => {
      if (res !== null) {
        this.router.navigate(['/map']);
      }
    });
  }

  clickArea(area) {
    this.store.dispatch(new EnteredArea(area));
  }
}
