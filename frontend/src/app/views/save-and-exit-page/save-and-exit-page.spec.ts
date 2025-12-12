import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAndExitPage } from './save-and-exit-page';

describe('SaveAndExitPage', () => {
  let component: SaveAndExitPage;
  let fixture: ComponentFixture<SaveAndExitPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveAndExitPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveAndExitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
