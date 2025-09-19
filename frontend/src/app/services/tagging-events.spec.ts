import { TestBed } from '@angular/core/testing';

import { TaggingEvents } from './tagging-events';

describe('TaggingEvents', () => {
  let service: TaggingEvents;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaggingEvents);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
