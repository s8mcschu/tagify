import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-screen-too-small-view',
  imports: [MatIconModule],
  templateUrl: './screen-too-small-view.html',
  styleUrl: './screen-too-small-view.scss'
})
export class ScreenTooSmallView implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
