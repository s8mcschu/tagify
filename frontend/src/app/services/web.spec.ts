import { TestBed } from '@angular/core/testing';

import { Web } from './web';

describe('Web', () => {
  let service: Web;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
