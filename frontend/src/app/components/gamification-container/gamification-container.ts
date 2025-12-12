import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GameElementHost } from '../../directives/game-element-host';
import { GamificationMapper, GamificationType } from '../../types/Gamification';
import { GameElementComponent } from '../game-elements/game-element-component';

@Component({
  selector: 'app-gamification-container',
  imports: [GameElementHost],
  templateUrl: './gamification-container.html',
  styleUrl: './gamification-container.scss'
})
export class GamificationContainer implements OnInit {

  @Input() gamification: GamificationType;
  @Input() triggerTutorialEvent?: Observable<MatDialogConfig>;
  @Output() onTutorialClosed = new EventEmitter<void>();

  @ViewChild(GameElementHost, {static: true}) gameElementHost!: GameElementHost;

  constructor() {
    this.gamification = "NONE";
  }

  ngOnInit(): void {
    this._loadGameElement();
  }

  private _loadGameElement() {
    const viewContainerRef = this.gameElementHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<GameElementComponent>(GamificationMapper[this.gamification]);
    componentRef.instance.triggerTutorialEvent = this.triggerTutorialEvent;
    componentRef.instance.onTutorialClosed.subscribe(() => {
      this.onTutorialClosed.emit();
    })
  }

}
