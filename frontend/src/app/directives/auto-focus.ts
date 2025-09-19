import { Directive, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocus implements OnInit {

  constructor(public viewContainerRef: ViewContainerRef) { }
  
  ngOnInit(): void {
    this.viewContainerRef.element.nativeElement.focus();
  }
}
