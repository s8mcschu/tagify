import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-points-and-badges-tutorial',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './tutorial.html',
  styleUrl: './tutorial.scss'
})
export class Tutorial {

}
