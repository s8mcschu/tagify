import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Model, SurveyNG, StylesManager } from "survey-angular";
import { SessionService } from 'src/app/services/session.service';
import { QuestionnaireMapper } from 'src/app/types/Questionnaires';
import { WebService } from 'src/app/services/web.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tp-questionnaire-view',
  templateUrl: './questionnaire-view.component.html',
  styleUrls: ['./questionnaire-view.component.scss']
})
export class QuestionnaireViewComponent implements OnInit, OnDestroy {

  public disableButton: boolean;

  private requestSubscription: Subscription;
  private _survey: Model
  private _questionnaires: string[]
  private _page: number;

  constructor(private _session: SessionService, private _webService: WebService, private _ngZone: NgZone) {
    StylesManager.applyTheme("defaultV2");
    this._survey = new Model();
    this._questionnaires = [];
    this._page = 1;
    this.disableButton = false;
    this.requestSubscription = this._webService.subscribeToRequesting((requesting) => {
      this.disableButton = requesting;
    });
  }

  ngOnInit(): void {
    if(this._session.isRouteValid("survey")) {
      const currentStep = this._session.currentStep;
      this._questionnaires = currentStep.content as string[];
      this._survey = new Model({
        pages: this._questionnaires.map(questionnaire => QuestionnaireMapper[questionnaire])
      });
      this._survey.showCompletedPage = false;
      this._survey.showNavigationButtons = false;
    
      this._survey.onComplete.add(() => this.onSurveyCompletion());
      SurveyNG.render("survey-container", { model: this._survey });
    }
  }

  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
  }

  public get isLastPage(): boolean {
    return this._page >= this._questionnaires.length;
  }

  public get notFirstPage(): boolean {
    return this._page > 1;
  }

  public nextPage() {
    if(this._survey.nextPage()) {
      this._page++;
    }
  }

  public previousPage() {
    if(this._survey.prevPage()) {
      this._page--;
    }
  }

  public completeSurvey() {
    this._survey.completeLastPage();
  }

  private async onSurveyCompletion() {
    const results: any = {};
    const data = this._survey.data;
    
    for(let key in data) {
      const question = this._survey.getQuestionByValueName(key);
      const page = this._survey.getPageByQuestion(question);
      
      if(!results[page.name]) results[page.name] = {};
      results[page.name][key] = data[key];
    }

    await this._webService.submitQuestionnaires(results);
    this._ngZone.run(async () => {
      await this._webService.updateAndGetNextStep();
    });
  }

}
