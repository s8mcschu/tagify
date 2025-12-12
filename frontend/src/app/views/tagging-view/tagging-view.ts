import { AfterViewInit, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { Session } from '../../services/session';
import { TaggingEvents} from '../../services/tagging-events';
import { TaggingDescriptor } from '../../types/Step';
import { Subject } from 'rxjs';
import { MatDialogConfig } from '@angular/material/dialog';
import { Web } from '../../services/web';
import { Tag } from '../../types/Tag';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ImageContainer } from '../../components/image-container/image-container';
import { TaggingContainer } from '../../components/tagging-container/tagging-container';
import { GamificationContainer } from '../../components/gamification-container/gamification-container';
import { TimeConverterPipe } from "../../pipes/time-converter-pipe";
import { CeilPipe } from "../../pipes/ceil-pipe";

@Component({
  selector: 'app-tagging-view',
  imports: [MatProgressBarModule, ImageContainer, TaggingContainer, GamificationContainer, TimeConverterPipe, CeilPipe],
  templateUrl: './tagging-view.html',
  styleUrl: './tagging-view.scss',
  host: {
    '[style.--flip-duration]': 'flipDuration'
  }
})
export class TaggingView implements OnInit, AfterViewInit, OnDestroy {

  config = signal<TaggingDescriptor>({
    gamification: "NONE", 
    tutorial: false, 
    resourceIdx: 0, 
    resources: []
  });

  showResource = signal(true);
  showTaggingField = signal(false);
  showResults = signal(false);
  currentResource = signal("");
  
  countDownProgress = signal(0);
  countDown = signal(env.resourceTimer);
  timerDuration = env.resourceTimer;

  triggerResourceTutorial: Subject<MatDialogConfig>;
  triggerTaggingTutorial: Subject<MatDialogConfig>;
  triggerGameElementTutorial: Subject<MatDialogConfig>;  
  
  private _timerInstance: number;
  private _startTimerTimestamp: number;
  private _resourceLoaded: boolean;
  private _animationFinished: boolean;

  private _resourceUrlBase = env.resourceFolder;

  private _tutorialDialogConfig: MatDialogConfig;

  constructor(
    private _session: Session, 
    private _tagService: TaggingEvents, 
    private _webService: Web
  ){
    this.triggerResourceTutorial = new Subject<MatDialogConfig>();
    this.triggerTaggingTutorial = new Subject<MatDialogConfig>();
    this.triggerGameElementTutorial = new Subject<MatDialogConfig>();
    
    this._timerInstance = -1;
    this._startTimerTimestamp = 0;
    this._resourceLoaded = false;
    this._animationFinished = false;

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
      this.config.set(currentStep.content as TaggingDescriptor);
      this.currentResource.set(this._resourceUrlBase + this.config().resources[this.config().resourceIdx]);
      
      const resourceObserved = localStorage.getItem("resourceObserved");
      if(resourceObserved && resourceObserved === "true") {
        this.showResource.set(false);
        this.showTaggingField.set(true);
      }
    }
  }

  ngAfterViewInit(): void {
    if(this.config().tutorial) {
      this.showResourceTutorial();
    }
    else {
      if(this.showResource()) {
        this.startCountDown();
      }
    }
  }

  ngOnDestroy(): void {
    clearInterval(this._timerInstance);
    this._timerInstance = -1;
  }

  get flipDuration(): string {
    return `${1 / env.animationSpeedFactor}s`;
  }

  public async submitTags(values: string[]) {
    const tags: Tag[] = values.map((tag) => { return { value: tag, resource: this._session.currentResource } });
    await this._webService.submitTags(tags);

    localStorage.setItem("resourceObserved", "false");
    const nextResource = this._session.nextResource;
    if(nextResource) {
      this.currentResource.set(this._resourceUrlBase + nextResource);
      this.triggerFlip();
    }
    else {
      await this._webService.updateAndGetNextStep();
    }
  }

  public triggerFlip() {
    if(this.showResource()) {
      this.showResource.update(sr => !sr);
      setTimeout(() => {
        this.showTaggingField.update(stf => !stf);
        this._tagService.notifyTagView();
      }, 1000 / env.animationSpeedFactor)
    }
    else {
      this.showTaggingField.update(stf => !stf);
      setTimeout(() => {
        this.showResource.update(sr => !sr);
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
        this.countDown.set(this.timerDuration - timeDiff);
        this.countDownProgress.set(Math.min(100, (timeDiff / this.timerDuration) * 100));
        if (timeDiff > this.timerDuration) {
          clearInterval(this._timerInstance);
          window.setTimeout(() => {
            this.countDownProgress.set(0);
            this.countDown.set(this.timerDuration);
            this.triggerFlip();
            localStorage.setItem("resourceObserved", "true");
          }, 1000 / env.animationSpeedFactor);
        }
      }, 1000)
    }
  }
}
