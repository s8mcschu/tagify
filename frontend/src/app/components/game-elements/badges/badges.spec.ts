import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Badges } from './badges';

describe('Badges', () => {
  let component: Badges;
  let fixture: ComponentFixture<Badges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Badges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Badges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
