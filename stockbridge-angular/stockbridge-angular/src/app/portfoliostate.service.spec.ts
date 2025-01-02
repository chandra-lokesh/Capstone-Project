import { TestBed } from '@angular/core/testing';

import { PortfoliostateService } from './portfoliostate.service';

describe('PortfoliostateService', () => {
  let service: PortfoliostateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfoliostateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
