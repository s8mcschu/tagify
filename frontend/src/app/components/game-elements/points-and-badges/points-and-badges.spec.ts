import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsAndBadges } from './points-and-badges';

describe('PointsAndBadges', () => {
  let component: PointsAndBadges;
  let fixture: ComponentFixture<PointsAndBadges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsAndBadges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsAndBadges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
