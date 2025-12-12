import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TaggingEvents } from "../../../services/tagging-events"
import { GameElementComponent } from '../game-element-component';
import { Tutorial } from './tutorial/tutorial';
import { Badge } from '../../../types/Badge';
import { Tag } from '../../../types/Tag';
import { MatTooltipModule } from '@angular/material/tooltip';
import { environment as env } from '../../../../../environments/environment';

@Component({
  selector: 'app-badges',
  imports: [MatTooltipModule, NgClass],
  templateUrl: './badges.html',
  styleUrl: './badges.scss',
  host: {
    '[style.--unlock-duration]': 'unlockDuration'
  }
})
export class Badges implements GameElementComponent, OnInit, OnDestroy  {
  @Input() triggerTutorialEvent?: Observable<MatDialogConfig>;
  @Output() onTutorialClosed = new EventEmitter<void>();
  @Output() onNewBadges = new EventEmitter<Badge[]>();

  badges = signal<Badge[]>([])

  private _tagCounts: number[];

  private _triggerTutorialSubscription?: Subscription;
  private _newTagSubscription?: Subscription;
  private _tagDeletedSubscription?: Subscription;
  private _nextImageSubscription?: Subscription;
  private _tagViewSubscription?: Subscription; 

  constructor(private tagService: TaggingEvents, private dialog: MatDialog) {
    this._tagCounts = [0];
    this.badges.set([
      { name: "Beginner", icon: "TTM.svg", background: "FrameLvl2.svg", fulfilled: false, tipp: "Enter 15 tags", checkCondition: () => this.milestoneBadge(15) },
      { name: "Advanced", icon: "FitnessGuru.svg", background: "FrameLvl4.svg", fulfilled: false, tipp: "Enter 45 tags", checkCondition: () => this.milestoneBadge(45) },
      { name: "Professional", icon: "BigFive.svg", background: "FrameLvl6.svg", fulfilled: false, tipp: "Enter 75 tags", checkCondition: () => this.milestoneBadge(75) },
      { name: "Master", icon: "Completionist.svg", background: "FrameLvl7.svg", fulfilled: false, tipp: "Enter 105 tags", checkCondition: () => this.milestoneBadge(105) }
    ])
  }

  ngOnInit(): void {
    this.tagService.getTagHistoryCurrentStep().then((tags) => this.initTagHistory(tags));
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

  public get unlockedBadges(): Badge[] {
    return this.badges().filter((badge) => badge.fulfilled);
  }

  get unlockDuration(): string {
    return `${1 / env.animationSpeedFactor}s`;
  }

  private initTagHistory(tags: Tag[]): void {
    let resource = "";
    for(let tag of tags) {
      if(resource !== tag.resource) {
        resource = tag.resource;
        this._tagCounts.push(0);
      }
      this._tagCounts[this._tagCounts.length - 1]++;
    }

    this._tagCounts.push(0);
    this.refreshBadges();
  }

  private showTutorial(config: MatDialogConfig): void {
    const dialogRef = this.dialog.open(Tutorial, config);
    dialogRef.afterClosed().subscribe(() => {
      this.onTutorialClosed.emit();
    })
  }

  private onNewTag(tag: string) {
    this._tagCounts[this._tagCounts.length - 1]++;
    const newBadges = this.refreshBadges();
    if(newBadges.length > 0) {
      this.onNewBadges.emit(newBadges);
    };
  }

  private onTagDeleted(tag: string) {
    this._tagCounts[this._tagCounts.length - 1]--;
    this.refreshBadges();
  }

  private onImageView() {
    this._tagCounts.push(0);
  }

  private onTagView() {}

  private refreshBadges(): Badge[] {
    let newBadges: Badge[] = []
    
    for(let badge of this.badges()) {
      const fulfilled = badge.checkCondition();
      if(!badge.fulfilled && fulfilled) {
        newBadges.push(badge);
      }
      badge.fulfilled = fulfilled;
    }

    if(newBadges.length > 0) {
      this.badges.update(badges => [...badges])
    }

    return newBadges;
  }

  private milestoneBadge(threshold: number): boolean {
    let sum = 0;
    for(let count of this._tagCounts) {
      sum += count;
    }
    return sum >= threshold;
  }
}
