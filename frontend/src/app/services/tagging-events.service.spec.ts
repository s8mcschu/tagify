import { TestBed } from '@angular/core/testing';

import { TaggingEventsService } from './tagging-events.service';

describe('TaggingEventsService', () => {
  let service: TaggingEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaggingEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
