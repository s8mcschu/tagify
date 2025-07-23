import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggingViewComponent } from './tagging-view.component';

describe('TaggingViewComponent', () => {
  let component: TaggingViewComponent;
  let fixture: ComponentFixture<TaggingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
