import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbortPage } from './abort-page';

describe('AbortPage', () => {
  let component: AbortPage;
  let fixture: ComponentFixture<AbortPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbortPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbortPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
