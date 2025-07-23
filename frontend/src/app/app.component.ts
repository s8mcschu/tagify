import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { environment as env, environment } from 'src/environments/environment';
import { AbortDialogComponent } from './components/dialogs/abort-dialog/abort-dialog.component';
import { DataPrivacyDialogComponent } from './components/dialogs/data-privacy-dialog/data-privacy-dialog.component';
import { ImprintDialogComponent } from './components/dialogs/imprint-dialog/imprint-dialog.component';
import { SessionService } from './services/session.service';
import { WebService } from './services/web.service';
import { Page } from './types/Step';

@Component({
  selector: 'tp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('banner', [
      transition(':leave',[
        style({
          bottom: '0'
        }),
        animate('1s ease-out', style({
          bottom: "-120px"
        }))
      ])
    ]),
    trigger('routeTransition', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(`${1 / env.animationSpeedFactor}s ease-out`, style({
          opacity: 1
        }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  
  public version: string;
  public windowWidth: number;
  public windowHeight: number;

  public showCookieBanner: boolean;

  public isLoading: boolean;
  public requesting: boolean;

  private _stepSubscription?: Subscription;
  private _requestingSubscription?: Subscription;
  private _page: Page

  constructor(
    private _session: SessionService, 
    private _dialog: MatDialog, 
    private _webService: WebService
  ){
    this.isLoading = true;
    this.requesting = false;
    this.version = env.version;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.showCookieBanner = true;
    this._page = _session.currentStep.page;
  }

  ngOnInit(): void {
    this.showCookieBanner = !env.cookieBanner ? false : this._session.cookieBanner;

    this._session.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    })

    this._stepSubscription = this._session.currentStep$.subscribe((step) => {
      this._page = step.page;
    });

    this._webService.getCurrentStep().then((step) => {
      if(!environment.allowManualViewAccess) {
        this._session.currentStep = step;
      }
      this.isLoading = false;
    });

    this._requestingSubscription = this._webService.subscribeToRequesting((requesting) => {
      this.requesting = requesting;
    });
  }

  ngOnDestroy(): void {
    this._stepSubscription?.unsubscribe();
    this._requestingSubscription?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.windowHeight = event.target.innerHeight;
  }

  get isContentPage(): boolean {
    return (
      this._page !== "welcome" && 
      this._page !== "end" &&
      this._page !== "aborted" &&
      this._page !== "saveAndExit"
    )
  }

  public saveAndExit() {
    this._session.currentStep = { page: "saveAndExit" }
  }

  public abort() {
    const dialog = this._dialog.open(AbortDialogComponent);
    dialog.afterClosed().subscribe(async (abort) => {
      if(abort) {
        await this._webService.submitAbort();
      }
    });
  }

  public showImprint() {
    this._dialog.open(ImprintDialogComponent, { autoFocus: false });
  }

  public showDataPrivacy() {
    this._dialog.open(DataPrivacyDialogComponent, { autoFocus: false, maxWidth: '800px' });
  }

  public hideCookieBanner() {
    this.showCookieBanner = false;
    this._session.deactivateCookieBanner();
  }
}
