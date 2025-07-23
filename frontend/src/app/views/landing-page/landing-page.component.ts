import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observer, Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { WebService } from 'src/app/services/web.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'tp-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  public consent: boolean;
  public disableButton: boolean;
  public contactName: string;
  public contactMail: string;

  private _requestSubscription: Subscription;

  constructor(private _session: SessionService, private _webService: WebService) {
    this.consent = false;
    this.disableButton = false;
    this.contactMail = env.contactMail;
    this.contactName = env.contactName;
    this._requestSubscription = this._webService.subscribeToRequesting((requesting) => {
      this.disableButton = requesting;
    });
  }

  ngOnInit(): void {
    this._session.isRouteValid("welcome");
  }

  ngOnDestroy(): void {
    this._requestSubscription.unsubscribe();
  }

  public async submitAndNext() {
    await this._webService.createUser();
    await this._webService.submitConsent();
    await this._webService.updateAndGetNextStep();  
  }
}
