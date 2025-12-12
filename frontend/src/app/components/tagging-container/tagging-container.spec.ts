import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggingContainer } from './tagging-container';

describe('TaggingContainer', () => {
  let component: TaggingContainer;
  let fixture: ComponentFixture<TaggingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaggingContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
