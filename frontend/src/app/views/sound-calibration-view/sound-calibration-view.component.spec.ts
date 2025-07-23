import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundCalibrationViewComponent } from './sound-calibration-view.component';

describe('SoundCalibrationViewComponent', () => {
  let component: SoundCalibrationViewComponent;
  let fixture: ComponentFixture<SoundCalibrationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundCalibrationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundCalibrationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
