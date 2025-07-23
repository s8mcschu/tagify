import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GameElementHostDirective } from 'src/app/directives/game-element-host.directive';
import { GamificationMapper, GamificationType } from 'src/app/types/Gamification';
import { GameElementComponent } from '../game-elements/game-element-component';

@Component({
  selector: 'tp-gamification-container',
  templateUrl: './gamification-container.component.html',
  styleUrls: ['./gamification-container.component.scss']
})
export class GamificationContainerComponent implements OnInit {

  @Input() gamification: GamificationType;
  @Input() triggerTutorialEvent?: Observable<MatDialogConfig>;
  @Output() onTutorialClosed = new EventEmitter<void>();

  @ViewChild(GameElementHostDirective, {static: true}) gameElementHost!: GameElementHostDirective;

  constructor() {
    this.gamification = "NONE";
  }

  ngOnInit(): void {
    this.loadGameElement();
  }

  private loadGameElement() {
    const viewContainerRef = this.gameElementHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<GameElementComponent>(GamificationMapper[this.gamification]);
    componentRef.instance.triggerTutorialEvent = this.triggerTutorialEvent;
    componentRef.instance.onTutorialClosed.subscribe(() => {
      this.onTutorialClosed.emit();
    })
  }

}
