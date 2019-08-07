import { TestBed } from '@angular/core/testing';
import { ScoreState } from './ScoreStore';
import { TagState, CaughtOrganism } from './TagStore';
import { Organism, CatchZone, Tag } from '../services/openapi';
import { Store, NgxsModule } from '@ngxs/store';


export class MockOrganism implements Organism {
    description: string;
    catchzone: CatchZone;
    deleted: boolean;
    updatedAt: string;
    name: string;  
    image: string;
    catchZone: CatchZone;
    tags: Tag[];
  
    constructor(name: string) {
      this.name = name;
    }
}

describe('--<[ TESTING ScoreStore ]>--', () => {
    const mockOrganism = new MockOrganism("testBeest");

    let store: Store;

    beforeEach(() =>  {
      TestBed.configureTestingModule({
          imports: [NgxsModule.forRoot([])]
      }).compileComponents();

      store = TestBed.get(Store);
    });


    it('should update score in localstorage', () => {
        store.select(state => state.scoreState.score).subscribe(score => {
            expect(score).toEqual(0);
        })

        store.dispatch(new CaughtOrganism(mockOrganism, currentCatchzone$));
        
        store.select(state => state.scoreState.score).subscribe(score => {
            expect(score).toEqual(10);

        })
    });
})
