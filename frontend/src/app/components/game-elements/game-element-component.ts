import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs";

export interface GameElementComponent {
  triggerTutorialEvent?: Observable<any>;
  onTutorialClosed: EventEmitter<void>;
}