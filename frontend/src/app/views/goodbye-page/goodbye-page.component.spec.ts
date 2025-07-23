import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodbyePageComponent } from './goodbye-page.component';

describe('GoodbyePageComponent', () => {
  let component: GoodbyePageComponent;
  let fixture: ComponentFixture<GoodbyePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodbyePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodbyePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
