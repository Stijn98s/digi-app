import { Component, } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import { Observable} from 'rxjs';
import {AddedFriend, PlayerState, RefreshPlayer} from '../../store/PlayerStore';
import {Player} from '../../services/openapi';

@Component({
  selector: 'app-friend-collection',
  templateUrl: './friend-collection.page.html',
  styleUrls: ['./friend-collection.page.scss'],
})
export class FriendCollectionPage {

  @Select( PlayerState.entities)
  public friends$: Observable<Player[]>;

  constructor(private store: Store) {
    this.store.dispatch(new RefreshPlayer());
  }


    addFriend(name: string) {
      this.store.dispatch(new AddedFriend(name));
    }
}
