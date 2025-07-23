import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TaggingEventsService } from 'src/app/services/tagging-events.service';
import { GameElementComponent } from '../game-element-component';
import { PointsAndBadgesTutorialComponent } from './tutorial/points-and-badges-tutorial.component';

@Component({
  selector: 'tp-points-and-badges',
  templateUrl: './points-and-badges.component.html',
  styleUrls: ['./points-and-badges.component.scss']
})
export class PointsAndBadgesComponent implements GameElementComponent, OnInit, OnDestroy {
  
  @Input() triggerTutorialEvent?: Observable<MatDialogConfig>;
  @Output() onTutorialClosed = new EventEmitter<void>();

  
  private _triggerTutorialSubscription?: Subscription;

  constructor(private tagService: TaggingEventsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this._triggerTutorialSubscription = this.triggerTutorialEvent?.subscribe(config => this.showTutorial(config));
  }

  ngOnDestroy(): void {
    this._triggerTutorialSubscription?.unsubscribe();
  }

  private showTutorial(config: MatDialogConfig): void {
    const dialogRef = this.dialog.open(PointsAndBadgesTutorialComponent, config);
    dialogRef.afterClosed().subscribe(() => {
      this.onTutorialClosed.emit();
    });
  }

}
