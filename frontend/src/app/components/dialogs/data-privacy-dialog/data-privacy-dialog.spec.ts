import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPrivacyDialog } from './data-privacy-dialog';

describe('DataPrivacyDialog', () => {
  let component: DataPrivacyDialog;
  let fixture: ComponentFixture<DataPrivacyDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPrivacyDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPrivacyDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
