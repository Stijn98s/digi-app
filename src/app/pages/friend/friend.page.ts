import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/services/openapi';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { PlayerState } from 'src/app/store/PlayerStore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage implements OnInit {

  public player$: Observable<Player>;

  constructor(private route: ActivatedRoute, private store: Store) {
      this.player$ = this.store.select(PlayerState.playerByID).pipe(map(filterFn => filterFn(this.route.snapshot.params.id)));
  }

  ngOnInit() {
  }

}
