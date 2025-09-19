import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggingView } from './tagging-view';

describe('TaggingView', () => {
  let component: TaggingView;
  let fixture: ComponentFixture<TaggingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaggingView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggingView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
