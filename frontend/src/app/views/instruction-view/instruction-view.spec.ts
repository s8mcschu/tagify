import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionView } from './instruction-view';

describe('InstructionView', () => {
  let component: InstructionView;
  let fixture: ComponentFixture<InstructionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructionView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructionView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
