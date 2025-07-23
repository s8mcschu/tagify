import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationContainerComponent } from './gamification-container.component';

describe('GamificationContainerComponent', () => {
  let component: GamificationContainerComponent;
  let fixture: ComponentFixture<GamificationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamificationContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamificationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
