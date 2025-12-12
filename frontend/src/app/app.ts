import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { environment as env, environment } from '../../environments/environment';
import { AbortDialog } from './components/dialogs/abort-dialog/abort-dialog';
import { DataPrivacyDialog } from './components/dialogs/data-privacy-dialog/data-privacy-dialog';
import { ImprintDialogComponent } from './components/dialogs/imprint-dialog/imprint-dialog';
import { Session } from './services/session';
import { Web } from './services/web';
import { Page } from './types/Step';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScreenTooSmallView } from './views/screen-too-small-view/screen-too-small-view';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatProgressBarModule, MatCardModule, MatIconModule, ScreenTooSmallView],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  
  version = env.version;
  windowWidth = signal(window.innerWidth);
  windowHeight = signal(window.innerHeight);

  showCookieBanner = signal(true);

  isLoading = signal(true);
  requesting = signal(false);

  private _stepSubscription?: Subscription;
  private _requestingSubscription?: Subscription;
  private _page: Page

  constructor(private _session: Session, private _dialog: MatDialog, private _webService: Web) {
    this._page = _session.currentStep.page;
  }

  ngOnInit(): void {
    this.showCookieBanner.set(!env.cookieBanner ? false : this._session.cookieBanner);

    this._session.loading$.subscribe((isLoading) => {
      this.isLoading.set(isLoading);
    })

    this._stepSubscription = this._session.currentStep$.subscribe((step) => {
      this._page = step.page;
    });

    this._webService.getCurrentStep().then((step) => {
      if(!environment.allowManualViewAccess) {
        this._session.currentStep = step;
      }
      this.isLoading.set(false);
    });

    this._requestingSubscription = this._webService.subscribeToRequesting((requesting) => {
      this.requesting.set(requesting);
    });
  }

  ngOnDestroy(): void {
    this._stepSubscription?.unsubscribe();
    this._requestingSubscription?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth.set(event.target.innerWidth);
    this.windowHeight.set(event.target.innerHeight);
  }

  get isContentPage(): boolean {
    return (
      this._page !== "welcome" && 
      this._page !== "end" &&
      this._page !== "aborted" &&
      this._page !== "saveAndExit"
    )
  }

  get routeDuration(): string {
    return `${1 / env.animationSpeedFactor}s`;
  }

  public saveAndExit() {
    this._session.currentStep = { page: "saveAndExit" }
  }

  public abort() {
    const dialog = this._dialog.open(AbortDialog);
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
    this._dialog.open(DataPrivacyDialog, { autoFocus: false, maxWidth: '800px' });
  }

  public hideCookieBanner() {
    this.showCookieBanner.set(false);
    this._session.deactivateCookieBanner();
  }
}
