import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TaggingEvents } from '../../../services/tagging-events';
import { GameElementComponent } from '../game-element-component';
import { Tutorial } from './tutorial/tutorial';
import { Points } from '../points/points';
import { Badges } from '../badges/badges';


@Component({
  selector: 'app-points-and-badges',
  imports: [Points, Badges],
  templateUrl: './points-and-badges.html',
  styleUrl: './points-and-badges.scss'
})
export class PointsAndBadges implements GameElementComponent, OnInit, OnDestroy  {

  @Input() triggerTutorialEvent?: Observable<MatDialogConfig>;
  @Output() onTutorialClosed = new EventEmitter<void>();

  
  private _triggerTutorialSubscription?: Subscription;

  constructor(private tagService: TaggingEvents, private dialog: MatDialog) {}

  ngOnInit(): void {
    this._triggerTutorialSubscription = this.triggerTutorialEvent?.subscribe(config => this.showTutorial(config));
  }

  ngOnDestroy(): void {
    this._triggerTutorialSubscription?.unsubscribe();
  }

  private showTutorial(config: MatDialogConfig): void {
    const dialogRef = this.dialog.open(Tutorial, config);
    dialogRef.afterClosed().subscribe(() => {
      this.onTutorialClosed.emit();
    });
  }

}
