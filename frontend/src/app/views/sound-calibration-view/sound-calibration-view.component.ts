import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'tp-sound-calibration-view',
  templateUrl: './sound-calibration-view.component.html',
  styleUrls: ['./sound-calibration-view.component.scss']
})
export class SoundCalibrationViewComponent implements OnInit, OnDestroy {

  public calibrationInput?: number;
  public validationNumber: number;
  public showHint: boolean;
  public disableButton: boolean;

  private _requestSubscription: Subscription;
  
  constructor(private _session: SessionService, private _webService: WebService) {
    this.validationNumber = 516971;
    this.showHint = false;
    this.disableButton = false;
    this._requestSubscription = this._webService.subscribeToRequesting((requesting) => {
      this.disableButton = requesting;
    });
  }

  ngOnInit(): void {
    this._session.isRouteValid("calibration");
  }
  
  ngOnDestroy(): void {
    this._requestSubscription.unsubscribe();
  }

  public async submitAndNext() {
    if(this.calibrationInput && this.calibrationInput === this.validationNumber) {
      await this._webService.submitCalibration(this.calibrationInput);
      await this._webService.updateAndGetNextStep();
    }
    else if(this.calibrationInput !== this.validationNumber) {
      this.showHint = true;
    }
  }
}
