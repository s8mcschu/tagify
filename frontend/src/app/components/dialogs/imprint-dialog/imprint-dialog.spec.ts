import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintDialog } from './imprint-dialog';

describe('ImprintDialog', () => {
  let component: ImprintDialog;
  let fixture: ComponentFixture<ImprintDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprintDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprintDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
