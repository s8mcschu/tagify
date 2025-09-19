import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TaggingEvents } from '../../../services/tagging-events';
import { Counter } from '../../../types/Counter';
import { Tag } from '../../../types/Tag';
import { GameElementComponent } from '../game-element-component';
import { Tutorial } from './tutorial/tutorial';
import { NgClass } from '@angular/common';
import { Counter as CountTo } from '../../../directives/counter';

type Layout = "circle" | "box";

@Component({
  selector: 'app-points',
  imports: [MatDialogModule, NgClass, CountTo],
  templateUrl: './points.html',
  styleUrl: './points.scss'
})
export class Points implements GameElementComponent, OnInit, OnDestroy {
  
  @Input() triggerTutorialEvent?: Observable<MatDialogConfig>;
  @Input() layout?: Layout
  @Output() onTutorialClosed = new EventEmitter<void>();
  @Output() onNewScore = new EventEmitter<number>();
  
  counter = signal<Counter>({
      countTo: 0,
      from: 0,
      duration: 0.5
    });

  private _triggerTutorialSubscription?: Subscription;
  private _newTagSubscription?: Subscription;
  private _tagDeletedSubscription?: Subscription;
  private _nextImageSubscription?: Subscription;
  private _tagViewSubscription?: Subscription; 

  constructor(private tagService: TaggingEvents, private dialog: MatDialog) {

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
    this.counter.update( counter => ({
      ...counter,
      from: 0,
      countTo: tags.length * 100
    }))
  }

  private showTutorial(config: MatDialogConfig) {
    const dialogRef = this.dialog.open(Tutorial, config);
    dialogRef.afterClosed().subscribe(() => {
      this.onTutorialClosed.emit();
    })
  }

  private onNewTag(tag: string) {
    this.counter.update(counter => ({
      ...counter,
      from: counter.countTo,
      countTo: counter.countTo + 100
    }))

    this.onNewScore.emit(this.counter().countTo);
  }

  private onTagDeleted(tag: string) {
    this.counter.update(counter => ({
      ...counter,
      from: counter.countTo,
      countTo: counter.countTo - 100
    }))

    this.onNewScore.emit(this.counter().countTo);
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
