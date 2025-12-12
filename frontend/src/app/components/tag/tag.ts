import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-tag',
  imports: [MatIconModule],
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
  host: {
    '[style.--dup-duration]': 'animationDuration'
  }
})
export class Tag implements OnInit, OnDestroy  {
  @Input() value: string;
  @Input() triggerDuplicateEvent?: Observable<void>;

  @Output() onDeleteTag = new EventEmitter<string>();

  warningTrigger = signal(false);

  private _duplicateAnimationSubscription: Subscription;

  constructor() {
    this.value = "";
    this.triggerDuplicateEvent = new Observable<void>();
    this._duplicateAnimationSubscription = new Subscription();
  }

  get animationDuration(): string {
    return `${1 / env.animationSpeedFactor}s`;
  }

  ngOnInit(): void {
    if(this.triggerDuplicateEvent) {
      this._duplicateAnimationSubscription = this.triggerDuplicateEvent.subscribe(() => {
        this.warningTrigger.update(wt => !wt);
      })
    }
  }

  ngOnDestroy(): void {
    this._duplicateAnimationSubscription.unsubscribe();
  }

  public deleteTag() {
    this.onDeleteTag.emit(this.value);
  }
}
