import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Session } from '../../services/session';
import { Web } from '../../services/web';
import { environment as env } from '../../../../environments/environment';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing-page',
  imports: [MatInputModule, MatCheckboxModule, FormsModule, MatButtonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage implements OnInit, OnDestroy {

  consent = false;
  disableButton = signal(false);
  
  contactName = env.contactMail;
  contactMail = env.contactName;

  private _requestSubscription: Subscription;

  constructor(private _session: Session, private _webService: Web) {
    this._requestSubscription = this._webService.subscribeToRequesting((requesting) => {
      this.disableButton.set(requesting);
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
