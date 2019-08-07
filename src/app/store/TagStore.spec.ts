import { TestBed } from '@angular/core/testing';
import { TagState, NewOrganisms, CaughtOrganism } from './TagStore';
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
  
    constructor(name: string, tags: Tag[]) {
      this.name = name;
      this.tags = tags;
    }
}

export class MockTag implements Tag {
    image: string;
    updatedAt: string;
    deleted: boolean;
    id: string;  name: string;
    description: string;
    points: number;
    color: string;

    constructor(name: string) {
        this.name = name;
    }
}


describe('--<[ TESTING TagStore ]>--', () => {
    const mockTag = new MockTag("testTag1");
    const mockOrganism = new MockOrganism("testBeest", [mockTag]);
    
    let store: Store;

    beforeEach(() =>  {
      TestBed.configureTestingModule({
          imports: [NgxsModule.forRoot([TagState])]
      }).compileComponents();

      store = TestBed.get(Store);
    });


    it('should add a new tag to the local storage', () => {
        store.dispatch(new NewOrganisms(mockOrganism));

        store.select(state => state.tagState.tags).subscribe(tags => {
            expect(tags.length).toEqual(1);
        })
    });
    
    it('should add the organism to the caught of tag', () => {
        store.dispatch(new NewOrganisms(mockOrganism));
        store.dispatch(new CaughtOrganism(mockOrganism, currentCatchzone$));

        store.select(state => state.tagState.tags).subscribe(tags => {
            expect(tags[mockOrganism.tags[0].name].caught.length).toEqual(1);
        })
    });
})
