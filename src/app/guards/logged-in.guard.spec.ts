import { TestBed, async, inject } from '@angular/core/testing';

import { NotLoggedInGuard } from './not-logged-in-guard.service';

describe('NotLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotLoggedInGuard]
    });
  });

  it('should ...', inject([NotLoggedInGuard], (guard: NotLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
