import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[tpCounter]'
})
export class CounterDirective {

  @Input() countTo: number;
  @Input() from: number;
  @Input() duration: number;

  private _nativeElement: any;
  private _currNum: number;
  private _refreshInterval: number;
  private _steps: number;
  private _step: number;
  private _increment: number;
  private _duration: number;

  private interval: any;

  constructor(private el: ElementRef) {
    this.countTo = 0;
    this.from = 0;
    this.duration = 1;

    this._nativeElement = this.el.nativeElement;
    this._currNum = 0;
    this._refreshInterval = 30;
    this._steps = 0;
    this._step = 0;
    this._increment = 0;
    this._duration = 0;

    this.interval = -1;
  }

  ngOnInit() {}

  ngOnChanges() {
    if(this.interval !== -1) {
      clearInterval(this.interval);
      this.interval = -1;
    }

    this.calculate();
    this.run();
  }

  private calculate() {
    this._duration = this.duration * 1000;

    this._steps = Math.ceil(this._duration / this._refreshInterval);
    this._increment = ((this.countTo - this.from) / this._steps);
    this._currNum = this.from;
  }

  private run() {
    this.interval = setInterval(() => {
      this._currNum += this._increment;
      this._step++;
      if (this._step >= this._steps) {
        this._currNum = this.countTo;
        this._nativeElement.textContent = this.countTo;
        this._step = 0;
        clearInterval(this.interval);
        this.interval = -1;
      } else {
        this._nativeElement.textContent = Math.round(this._currNum);
      }
    }, this._refreshInterval)
  }

}
