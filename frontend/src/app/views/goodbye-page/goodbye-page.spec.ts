import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodbyePage } from './goodbye-page';

describe('GoodbyePage', () => {
  let component: GoodbyePage;
  let fixture: ComponentFixture<GoodbyePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodbyePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodbyePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
