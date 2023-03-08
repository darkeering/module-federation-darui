import { TestBed } from '@angular/core/testing';

import { LeaveGuard } from './leave.guard';

describe('LeaveGuard', () => {
  let guard: LeaveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeaveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
