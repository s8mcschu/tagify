import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAndExitPageComponent } from './save-and-exit-page.component';

describe('SaveAndExitPageComponent', () => {
  let component: SaveAndExitPageComponent;
  let fixture: ComponentFixture<SaveAndExitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveAndExitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAndExitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
