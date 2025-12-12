import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTooSmallView } from './screen-too-small-view';

describe('ScreenTooSmallView', () => {
  let component: ScreenTooSmallView;
  let fixture: ComponentFixture<ScreenTooSmallView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenTooSmallView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenTooSmallView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
