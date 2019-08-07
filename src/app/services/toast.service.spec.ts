import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { Organism, CatchZone, Tag } from 'src/app/services/openapi';

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

describe('--<[ TESTING ToastService ]>--', () => {
  let service: ToastService;
  beforeEach(() =>  {
    TestBed.configureTestingModule({})
    service = TestBed.get(ToastService);
  });


  const mockTag = new MockTag("testTag1");
  const mockOrganism = new MockOrganism("testBeest", [mockTag]);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a notification', () => {
    service.addNotification("testnotification 1", "testimage");

    expect(service.notifications.length).toEqual(1);
  })


  it('should create multiple notifications', () => {
    service.addNotification("testnotification 1", "testimage");
    service.addNotification("testnotification 1", "testimage");
    
    expect(service.notifications.length).toEqual(2);
  })

  it('should run the queue and remove all notifications', () => {
    service.addNotification("testnotification 1", "testimage");
    service.addNotification("testnotification 1", "testimage");

    service.runQueue().then(() => {
      expect(service.notifications.length).toEqual(0);
    })
  })
});
