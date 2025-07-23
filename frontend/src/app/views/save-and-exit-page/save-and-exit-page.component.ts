import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tp-save-and-exit-page',
  templateUrl: './save-and-exit-page.component.html',
  styleUrls: ['./save-and-exit-page.component.scss']
})
export class SaveAndExitPageComponent implements OnInit {

  public url = "";

  constructor() {
    this.url = window.location.protocol + '//' + window.location.host;
   }

  ngOnInit(): void {}

}
