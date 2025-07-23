import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, style, animate, transition} from '@angular/animations';
import { environment as env } from 'src/environments/environment';
import { SessionService } from 'src/app/services/session.service';
import { TaggingEventsService } from 'src/app/services/tagging-events.service';
import { TaggingDescriptor } from 'src/app/types/Step';
import { Subject } from 'rxjs';
import { MatDialogConfig } from '@angular/material/dialog';
import { WebService } from 'src/app/services/web.service';
import { Tag } from 'src/app/types/Tag';

@Component({
  selector: 'tp-tagging-view',
  templateUrl: './tagging-view.component.html',
  styleUrls: ['./tagging-view.component.scss'],
  animations: [
    trigger('flip', [
      transition(':enter',[
        style({
          transform: "rotate3d(0,1,0,-90deg)"
        }),
        animate(`${1 / env.animationSpeedFactor}s ease-in`, style({
          transform: "rotate3d(0,1,0,0deg)"
        }))
      ]),

      transition(':leave',[
        style({
          transform: "rotate3d(0,1,0,0deg)"
        }),
        animate(`${1 / env.animationSpeedFactor}s ease-out`, style({
          transform: "rotate3d(0,1,0,90deg)"
        }))
      ])
    ])
  ]
})
export class TaggingViewComponent implements OnInit, AfterViewInit, OnDestroy {

  public config: TaggingDescriptor;

  public showResource: boolean;
  public showTaggingField: boolean;
  public showResults: boolean;
  public currentResource: string;
  public timerDuration: number;
  public countDownProgress: number;
  public countDown: number;

  public triggerResourceTutorial: Subject<MatDialogConfig>;
  public triggerTaggingTutorial: Subject<MatDialogConfig>;
  public triggerGameElementTutorial: Subject<MatDialogConfig>;  
  
  private _timerInstance: number;
  private _startTimerTimestamp: number;
  private _resourceLoaded: boolean;
  private _animationFinished: boolean;
  private resourceUrlBase: string;

  private _tutorialDialogConfig: MatDialogConfig;

  constructor(
    private _session: SessionService, 
    private _tagService: TaggingEventsService, 
    private _webService: WebService
  ){
    this.config = { gamification: "NONE", tutorial: false, resourceIdx: 0, resources: [] }
    this.showResource = true;
    this.showTaggingField = false;
    this.showResults = false;
    this.currentResource = "";
    this.countDownProgress = 0;
    this.countDown = env.resourceTimer;
    this.triggerResourceTutorial = new Subject<MatDialogConfig>();
    this.triggerTaggingTutorial = new Subject<MatDialogConfig>();
    this.triggerGameElementTutorial = new Subject<MatDialogConfig>();
    this._timerInstance = -1;
    this.timerDuration = env.resourceTimer;
    this._startTimerTimestamp = 0;
    this._resourceLoaded = false;
    this._animationFinished = false;
    this.resourceUrlBase = "../../../assets/" + env.resourceFolder;
    this._tutorialDialogConfig = {
      autoFocus: false,
      minWidth: '480px',
      maxWidth: '600px',
      width: '50%'
    }
  }

  ngOnInit(): void {
    if(this._session.isRouteValid("tagging")) {
      const currentStep = this._session.currentStep;
      this.config = currentStep.content as TaggingDescriptor;
      this.currentResource = this.resourceUrlBase + this.config.resources[this.config.resourceIdx];
      
      const resourceObserved = localStorage.getItem("resourceObserved");
      if(resourceObserved && resourceObserved === "true") {
        this.showResource = false;
        this.showTaggingField = true;
      }
    }
  }

  ngAfterViewInit(): void {
    if(this.config.tutorial) {
      this.showResourceTutorial();
    }
    else {
      if(this.showResource) {
        this.startCountDown();
      }
    }
  }

  ngOnDestroy(): void {
    clearInterval(this._timerInstance);
    this._timerInstance = -1;
  }

  public async submitTags(values: string[]) {
    const tags: Tag[] = values.map((tag) => { return { value: tag, resource: this._session.currentResource } });
    await this._webService.submitTags(tags);
    localStorage.setItem("resourceObserved", "false");
    
    const nextResource = this._session.nextResource;
    if(nextResource) {
      this.currentResource = this.resourceUrlBase + nextResource;
      this.triggerFlip();
    }
    else {
      await this._webService.updateAndGetNextStep();
    }
  }

  public triggerFlip() {
    if(this.showResource) {
      this.showResource = !this.showResource;
      setTimeout(() => {
        this.showTaggingField = !this.showTaggingField;
        this._tagService.notifyTagView();
      }, 1000 / env.animationSpeedFactor)
    }
    else {
      this.showTaggingField = !this.showTaggingField;
      setTimeout(() => {
        this.showResource = !this.showResource;
        this._tagService.notifyImageView();
        
        if(this._resourceLoaded) {
          this.startCountDown();
        }
        else {
          this._animationFinished = true;
        }
      }, 1000 / env.animationSpeedFactor)
    }
  }

  public onResourceLoaded() {
    if(this._animationFinished) {
      this.startCountDown();
    }
    else {
      this._resourceLoaded = true;
    }
  }

  public onResourceTutorialClosed() {
    this.startCountDown();
    setTimeout(
      () => this.showTaggingTutorial(), 
      this.timerDuration + 4 * (1000 / env.animationSpeedFactor)
    ); 
  }

  public onTaggingTutorialClosed() {
    this.showGamificationTutorial();
  }

  public onGamificationTutorialClosed() {
    // ?
  }

  private showResourceTutorial() {
    this.triggerResourceTutorial.next(this._tutorialDialogConfig);
  }

  private showTaggingTutorial() {
    this.triggerTaggingTutorial.next(this._tutorialDialogConfig);
  }

  private showGamificationTutorial() {
    this.triggerGameElementTutorial.next(this._tutorialDialogConfig);
  }

  private startCountDown() {
    // first reset both flags
    this._animationFinished = false;
    this._resourceLoaded = false;

    // Timer
    if(this.timerDuration > 0) {
      this._startTimerTimestamp = Date.now();
      this._timerInstance = window.setInterval(() => {
        const timeDiff = Date.now() - this._startTimerTimestamp;
        this.countDown = this.timerDuration - timeDiff;
        this.countDownProgress = Math.min(100, (timeDiff / this.timerDuration) * 100);
        if (timeDiff > this.timerDuration) {
          clearInterval(this._timerInstance);
          window.setTimeout(() => {
            this.countDownProgress = 0;
            this.countDown = this.timerDuration;
            this.triggerFlip();
            localStorage.setItem("resourceObserved", "true");
          }, 1000 / env.animationSpeedFactor);
        }
      }, 1000)
    }
  }
}
