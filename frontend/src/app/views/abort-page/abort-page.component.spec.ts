import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbortPageComponent } from './abort-page.component';

describe('AbortPageComponent', () => {
  let component: AbortPageComponent;
  let fixture: ComponentFixture<AbortPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbortPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbortPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
