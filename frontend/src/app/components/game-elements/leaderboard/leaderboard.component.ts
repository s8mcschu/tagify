import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TaggingEventsService } from 'src/app/services/tagging-events.service';
import { GameElementComponent } from '../game-element-component';
import { LeaderboardTutorialComponent } from './tutorial/leaderboard-tutorial.component';

@Component({
  selector: 'tp-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements GameElementComponent, OnInit, OnDestroy {
  
  @Input() triggerTutorialEvent?: Observable<MatDialogConfig>;
  @Output() onTutorialClosed = new EventEmitter<void>();

  private _triggerTutorialSubscription?: Subscription;
  private _newTagSubscription?: Subscription;
  private _tagDeletedSubscription?: Subscription;
  private _nextImageSubscription?: Subscription;
  private _tagViewSubscription?: Subscription; 

  constructor(private tagService: TaggingEventsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this._triggerTutorialSubscription = this.triggerTutorialEvent?.subscribe(config => this.showTutorial(config));
    this._newTagSubscription = this.tagService.onNewTag(tag => this.onNewTag(tag));
    this._tagDeletedSubscription = this.tagService.onTagDeleted(tag => this.onTagDeleted(tag));
    this._nextImageSubscription = this.tagService.onImageView(() => this.onImageView());
    this._tagViewSubscription = this.tagService.onTagView(() => this.onTagView());
  }

  ngOnDestroy(): void {
    this._triggerTutorialSubscription?.unsubscribe();
    this._newTagSubscription?.unsubscribe();
    this._tagDeletedSubscription?.unsubscribe();
    this._nextImageSubscription?.unsubscribe();
    this._tagViewSubscription?.unsubscribe();
  }

  private showTutorial(config: MatDialogConfig): void {
    const dialogRef = this.dialog.open(LeaderboardTutorialComponent, config);
    dialogRef.afterClosed().subscribe(() => {
      this.onTutorialClosed.emit();
    })
  }

  private onNewTag(tag: string) {

  }

  private onTagDeleted(tag: string) {

  }

  private onImageView() {

  }

  private onTagView() {

  }

}
