import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'tp-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  animations: [
    trigger('duplicateWarning', [
      transition(':enter', [
        animate(`${1 / env.animationSpeedFactor}s`, keyframes([
          style({ backgroundColor: "#ffd740" }),
          style({ backgroundColor: "#3f51b5" })
        ]))
      ]),
      transition('* => *', [
        animate(`${1 / env.animationSpeedFactor}s`, keyframes([
          style({ backgroundColor: "#3f51b5" }),
          style({ backgroundColor: "#f44336" }),
          style({ backgroundColor: "#3f51b5" })
        ]))
      ])
    ])
  ]
})
export class TagComponent implements OnInit, OnDestroy {

  @Input() value: string;
  @Input() triggerDuplicateEvent?: Observable<void>;

  @Output() onDeleteTag = new EventEmitter<string>();

  public warningTrigger: boolean;

  private _duplicateAnimationSubscription: Subscription;

  constructor() {
    this.value = "";
    this.triggerDuplicateEvent = new Observable<void>();
    this.warningTrigger = false;
    this._duplicateAnimationSubscription = new Subscription();
  }

  ngOnInit(): void {
    if(this.triggerDuplicateEvent) {
      this._duplicateAnimationSubscription = this.triggerDuplicateEvent.subscribe(() => {
        this.warningTrigger = !this.warningTrigger;
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
