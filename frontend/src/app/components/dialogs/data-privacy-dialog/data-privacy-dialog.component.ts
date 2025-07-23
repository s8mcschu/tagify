import { Component } from '@angular/core';
import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'tp-data-privacy-dialog',
  templateUrl: './data-privacy-dialog.component.html',
  styleUrls: ['./data-privacy-dialog.component.scss']
})
export class DataPrivacyDialogComponent {

  public contactName: string;
  public contactMail: string;

  constructor() {
    this.contactMail = env.contactMail;
    this.contactName = env.contactName;
  }
}
