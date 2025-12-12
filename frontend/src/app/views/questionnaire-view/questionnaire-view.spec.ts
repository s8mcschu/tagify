import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireView } from './questionnaire-view';

describe('QuestionnaireView', () => {
  let component: QuestionnaireView;
  let fixture: ComponentFixture<QuestionnaireView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnaireView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionnaireView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
