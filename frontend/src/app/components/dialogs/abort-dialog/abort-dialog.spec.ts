import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbortDialog } from './abort-dialog';

describe('AbortDialog', () => {
  let component: AbortDialog;
  let fixture: ComponentFixture<AbortDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbortDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbortDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
