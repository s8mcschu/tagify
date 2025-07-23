import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TaggingEventsService } from 'src/app/services/tagging-events.service';
import { Counter } from 'src/app/types/Counter';
import { Tag } from 'src/app/types/Tag';
import { GameElementComponent } from '../game-element-component';
import { PointsTutorialComponent } from './tutorial/points-tutorial.component';

type Layout = "circle" | "box";

@Component({
  selector: 'tp-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements GameElementComponent, OnInit, OnDestroy {

  @Input() triggerTutorialEvent?: Observable<MatDialogConfig>;
  @Input() layout?: Layout
  @Output() onTutorialClosed = new EventEmitter<void>();
  @Output() onNewScore = new EventEmitter<number>();
  
  public counter: Counter;

  private _triggerTutorialSubscription?: Subscription;
  private _newTagSubscription?: Subscription;
  private _tagDeletedSubscription?: Subscription;
  private _nextImageSubscription?: Subscription;
  private _tagViewSubscription?: Subscription; 

  constructor(private tagService: TaggingEventsService, private dialog: MatDialog) {
    this.counter = {
      countTo: 0,
      from: 0,
      duration: 0.5
    }
  }

  ngOnInit(): void {
    this.tagService.getTagHistoryCurrentStep().then((tags) => this.initTagHistory(tags));
    this._triggerTutorialSubscription = this.triggerTutorialEvent?.subscribe(config => this.showTutorial(config));
    this._newTagSubscription = this.tagService.onNewTag(tag => this.onNewTag(tag));
    this._tagDeletedSubscription = this.tagService.onTagDeleted(tag => this.onTagDeleted(tag));
    this._nextImageSubscription = this.tagService.onImageView(() => this.onImageView());
    this._tagViewSubscription = this.tagService.onTagView(() => this.onTagView());
  }

  private initTagHistory(tags: Tag[]): void {
    this.counter.from = 0;
    this.counter.countTo = tags.length * 100;
  }

  private showTutorial(config: MatDialogConfig) {
    const dialogRef = this.dialog.open(PointsTutorialComponent, config);
    dialogRef.afterClosed().subscribe(() => {
      this.onTutorialClosed.emit();
    })
  }

  private onNewTag(tag: string) {
    this.counter.from = this.counter.countTo;
    this.counter.countTo = this.counter.countTo + 100;
    this.onNewScore.emit(this.counter.countTo);
  }

  private onTagDeleted(tag: string) {
    this.counter.from = this.counter.countTo;
    this.counter.countTo = this.counter.countTo - 100;
    this.onNewScore.emit(this.counter.countTo);
  }

  private onImageView() {}

  private onTagView() {}

  ngOnDestroy(): void {
    this._triggerTutorialSubscription?.unsubscribe();
    this._newTagSubscription?.unsubscribe();
    this._tagDeletedSubscription?.unsubscribe();
    this._nextImageSubscription?.unsubscribe();
    this._tagViewSubscription?.unsubscribe();
  }
}
