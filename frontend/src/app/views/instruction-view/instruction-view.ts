import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Session } from '../../services/session';
import { Web } from '../../services/web';
import { InstructionPageDescriptor } from '../../types/Step';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-instruction-view',
  imports: [MatButtonModule],
  templateUrl: './instruction-view.html',
  styleUrl: './instruction-view.scss'
})
export class InstructionView implements OnInit, OnDestroy {

  heading = signal("");
  text = signal("");
  disableButton = signal(false);

  private requestSubscription: Subscription;

  constructor(private _session: Session, private _webService: Web) {
    this.requestSubscription = this._webService.subscribeToRequesting((requesting) => {
      this.disableButton.set(requesting);
    });
  }

  ngOnInit(): void {
    if(this._session.isRouteValid("instruction")) {
      const currentStep = this._session.currentStep;
      const content = currentStep.content as InstructionPageDescriptor;
      if(content) {
        this.heading.set(content.heading);
        this.text.set(content.text);
      }
    }
  }

  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
  }

  public async submitAndNext() {
    await this._webService.updateAndGetNextStep();
  }

}
