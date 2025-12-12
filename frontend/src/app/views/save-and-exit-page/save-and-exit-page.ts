import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-and-exit-page',
  imports: [],
  templateUrl: './save-and-exit-page.html',
  styleUrl: './save-and-exit-page.scss'
})
export class SaveAndExitPage implements OnInit {

  public url = window.location.protocol + '//' + window.location.host;;

  constructor() {

  }

  ngOnInit(): void {}

}
