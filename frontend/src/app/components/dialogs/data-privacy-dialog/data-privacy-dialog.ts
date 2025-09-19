import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { environment as env } from '../../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-data-privacy-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './data-privacy-dialog.html',
  styleUrl: './data-privacy-dialog.scss'
})
export class DataPrivacyDialog {

  public contactName: string;
  public contactMail: string;

  constructor() {
    this.contactMail = env.contactMail;
    this.contactName = env.contactName;
  }
}
