import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageContainer } from './image-container';

describe('ImageContainer', () => {
  let component: ImageContainer;
  let fixture: ComponentFixture<ImageContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
