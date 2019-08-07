import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendCollectionPage } from './friend-collection.page';

describe('FriendCollectionPage', () => {
  let component: FriendCollectionPage;
  let fixture: ComponentFixture<FriendCollectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendCollectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendCollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
