import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsAndBadgesComponent } from './points-and-badges.component';

describe('PointsAndBadgesComponent', () => {
  let component: PointsAndBadgesComponent;
  let fixture: ComponentFixture<PointsAndBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsAndBadgesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsAndBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
