import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTooSmallViewComponent } from './screen-too-small-view.component';

describe('ScreenTooSmallViewComponent', () => {
  let component: ScreenTooSmallViewComponent;
  let fixture: ComponentFixture<ScreenTooSmallViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenTooSmallViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenTooSmallViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
