import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[tpGameElementHost]'
})
export class GameElementHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
