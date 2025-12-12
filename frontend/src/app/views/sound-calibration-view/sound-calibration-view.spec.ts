import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundCalibrationView } from './sound-calibration-view';

describe('SoundCalibrationView', () => {
  let component: SoundCalibrationView;
  let fixture: ComponentFixture<SoundCalibrationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoundCalibrationView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundCalibrationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
