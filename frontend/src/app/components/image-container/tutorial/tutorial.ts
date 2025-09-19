import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { TimeConverterPipe } from "../../../pipes/time-converter-pipe";
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-image-container-tutorial',
  imports: [MatDialogModule, MatButtonModule, TimeConverterPipe],
  templateUrl: './tutorial.html',
  styleUrl: './tutorial.scss'
})
export class Tutorial {

  public resourceTime = environment.resourceTimer;

  constructor() { }

  ngOnInit(): void {

  }

}
