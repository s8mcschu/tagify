import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTutorialDialogComponent } from './image-tutorial-dialog.component';

describe('ImageTutorialDialogComponent', () => {
  let component: ImageTutorialDialogComponent;
  let fixture: ComponentFixture<ImageTutorialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTutorialDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTutorialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
