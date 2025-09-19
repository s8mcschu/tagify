import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Points } from './points';

describe('Points', () => {
  let component: Points;
  let fixture: ComponentFixture<Points>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Points]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Points);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
