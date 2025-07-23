import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tp-image-tutorial-dialog',
  templateUrl: './image-tutorial-dialog.component.html',
  styleUrls: ['./image-tutorial-dialog.component.scss']
})
export class ImageTutorialDialogComponent implements OnInit {

  public resourceTime = environment.resourceTimer;

  constructor() { }

  ngOnInit(): void {
  }

}
