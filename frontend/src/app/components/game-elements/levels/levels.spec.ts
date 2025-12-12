import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Levels } from './levels';

describe('Levels', () => {
  let component: Levels;
  let fixture: ComponentFixture<Levels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Levels]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Levels);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
