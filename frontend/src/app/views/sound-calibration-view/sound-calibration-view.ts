import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Session } from '../../services/session';
import { Web } from '../../services/web';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sound-calibration-view',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './sound-calibration-view.html',
  styleUrl: './sound-calibration-view.scss'
})
export class SoundCalibrationView implements OnInit, OnDestroy {

  calibrationInput?: number;
  validationNumber = 516971;
  
  showHint = signal(false);
  disableButton = signal(false);

  private _requestSubscription: Subscription;
  
  constructor(private _session: Session, private _webService: Web) {
    this._requestSubscription = this._webService.subscribeToRequesting((requesting) => {
      this.disableButton.set(requesting);
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
      this.showHint.set(true);
    }
  }
}
