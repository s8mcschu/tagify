import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appGameElementHost]'
})
export class GameElementHost {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
