import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismPage } from './organism.page';
import { ResizeImgurPipe } from 'src/app/pipes/resize-imgur.pipe';

describe('OrganismPage', () => {
  let component: OrganismPage;
  let fixture: ComponentFixture<OrganismPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganismPage, ResizeImgurPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
