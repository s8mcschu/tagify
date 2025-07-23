import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggingContainerComponent } from './tagging-container.component';

describe('TaggingContainerComponent', () => {
  let component: TaggingContainerComponent;
  let fixture: ComponentFixture<TaggingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggingContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
