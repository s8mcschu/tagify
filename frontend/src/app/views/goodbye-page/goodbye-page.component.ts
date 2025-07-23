import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { EndPageDescriptor } from 'src/app/types/Step';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tp-goodbye-page',
  templateUrl: './goodbye-page.component.html',
  styleUrls: ['./goodbye-page.component.scss']
})
export class GoodbyePageComponent implements OnInit {

  public forwardUrl?: string
  public contactMail: string;
  public contactName: string;

  constructor(private _session: SessionService) {
    this.contactMail = environment.contactMail;
    this.contactName = environment.contactName;
  }

  ngOnInit(): void {
    if(this._session.isRouteValid("end")) {
      const currentStep = this._session.currentStep;
      const content = currentStep.content as EndPageDescriptor;
      if(content?.forwardUrl) {
        this.forwardUrl = content.forwardUrl;
        window.open(this.forwardUrl, "_blank");
      }
    }
  }

}
