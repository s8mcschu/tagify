import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { WebService } from 'src/app/services/web.service';
import { InstructionPageDescriptor } from 'src/app/types/Step';

@Component({
  selector: 'tp-instruction-view',
  templateUrl: './instruction-view.component.html',
  styleUrls: ['./instruction-view.component.scss']
})
export class InstructionViewComponent implements OnInit, OnDestroy {

  public heading?: string;
  public text?: string;
  public disableButton: boolean;

  private requestSubscription: Subscription;

  constructor(private _session: SessionService, private _webService: WebService) {
    this.disableButton = false;
    this.requestSubscription = this._webService.subscribeToRequesting((requesting) => {
      this.disableButton = requesting;
    });
  }

  ngOnInit(): void {
    if(this._session.isRouteValid("instruction")) {
      const currentStep = this._session.currentStep;
      const content = currentStep.content as InstructionPageDescriptor;
      if(content) {
        this.heading = content.heading;
        this.text = content.text;
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
