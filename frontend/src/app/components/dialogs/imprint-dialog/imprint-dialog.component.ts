import { Component } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'tp-imprint-dialog',
  templateUrl: './imprint-dialog.component.html',
  styleUrls: ['./imprint-dialog.component.scss']
})
export class ImprintDialogComponent {

  public contactName: string;
  public contactMail: string;

  constructor() {
    this.contactMail = env.contactMail;
    this.contactName = env.contactName;
  }

}
