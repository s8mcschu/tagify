import { Component } from '@angular/core';
import { environment as env } from '../../../../../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-imprint-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './imprint-dialog.html',
  styleUrls: ['./imprint-dialog.scss']
})
export class ImprintDialogComponent {

  public contactName: string;
  public contactMail: string;

  constructor() {
    this.contactMail = env.contactMail;
    this.contactName = env.contactName;
  }

}
