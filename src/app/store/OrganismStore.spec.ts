import { TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { OrganismState } from './OrganismStore';
import { Organism, CatchZone, Tag } from '../services/openapi';
import { CaughtOrganism, TagState } from './TagStore';


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

describe('--<[ TESTING OrganismStore ]>--', () => {
    let store: Store;

    const mockOrganism = new MockOrganism("testBeest");

    beforeEach(() =>  {
      TestBed.configureTestingModule({
          imports: [NgxsModule.forRoot([])]
      }).compileComponents();

      store = TestBed.get(Store);
    });



})
