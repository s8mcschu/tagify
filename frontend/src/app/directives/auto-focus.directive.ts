import { Directive, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[tpAutoFocus]'
})
export class AutoFocusDirective implements OnInit {

  constructor(public viewContainerRef: ViewContainerRef) { }
  
  ngOnInit(): void {
    this.viewContainerRef.element.nativeElement.focus();
  }

}
