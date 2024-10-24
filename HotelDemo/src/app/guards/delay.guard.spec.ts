import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { delayGuard } from './delay.guard';

describe('delayGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => delayGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
