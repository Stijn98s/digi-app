import { TestBed, async, inject } from '@angular/core/testing';

import { AreaGuard } from './area.guard';

describe('AreaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaGuard]
    });
  });

  it('should ...', inject([AreaGuard], (guard: AreaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
