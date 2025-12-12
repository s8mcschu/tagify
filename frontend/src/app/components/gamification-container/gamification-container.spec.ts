import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationContainer } from './gamification-container';

describe('GamificationContainer', () => {
  let component: GamificationContainer;
  let fixture: ComponentFixture<GamificationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamificationContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamificationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
