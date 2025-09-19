import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-abort-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './abort-dialog.html',
  styleUrl: './abort-dialog.scss'
})
export class AbortDialog {

}
