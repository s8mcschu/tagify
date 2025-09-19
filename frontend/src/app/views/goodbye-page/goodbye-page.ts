import { Component, OnInit, signal } from '@angular/core';
import { Session } from '../../services/session';
import { EndPageDescriptor } from '../../types/Step';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-goodbye-page',
  imports: [],
  templateUrl: './goodbye-page.html',
  styleUrl: './goodbye-page.scss'
})
export class GoodbyePage implements OnInit {

  forwardUrl = signal<string | undefined>(undefined)
  public contactMail: string;
  public contactName: string;

  constructor(private _session: Session) {
    this.contactMail = environment.contactMail;
    this.contactName = environment.contactName;
  }

  ngOnInit(): void {
    if(this._session.isRouteValid("end")) {
      const currentStep = this._session.currentStep;
      const content = currentStep.content as EndPageDescriptor;
      if(content?.forwardUrl) {
        this.forwardUrl.set(content.forwardUrl);
        window.open(this.forwardUrl(), "_blank");
      }
    }
  }
}
