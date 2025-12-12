import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TaggingDescriptor, Step, Page } from '../types/Step';

@Injectable({
  providedIn: 'root'
})
export class Session {
  
  public loading$: Subject<boolean>;
  public currentStep$: Subject<Step>;
  private _currentStep: Step;

  constructor(private _router: Router) {
    this.loading$ = new Subject<boolean>();
    this.currentStep$ = new Subject<Step>();
    this._currentStep = {
      page: "welcome"
    }
  }

  set loading(isLoading: boolean) {
    this.loading$.next(isLoading);
  }

  set currentStep(step: Step) {
    this._currentStep = step;
    this.currentStep$.next(this._currentStep);
    this.redirectToCurrentStep();
  }

  get currentStep(): Step {
    return this._currentStep;
  }

  get currentResource(): string {
    if(this._currentStep.page === "tagging") {
      const content = this._currentStep.content as TaggingDescriptor;
      return content.resources[content.resourceIdx];
    }
    throw Error("Not on Tagging Page");
  }

  get nextResource(): string | undefined {
    if(this._currentStep.page === "tagging") {
      const content = this._currentStep.content as TaggingDescriptor;
      if(content.resourceIdx >= content.resources.length) {
        return undefined;
      }
      else {
        content.resourceIdx++;
      }
      
      return content.resources[content.resourceIdx];
    }
    throw Error("Not on Tagging Page");
  }

  get cookieBanner(): boolean {
    const banner = localStorage.getItem("cookieBanner");
    return banner === null || banner === "true"; 
  }

  public activateCookieBanner() {
    localStorage.setItem("cookieBanner", "true");
  }

  public deactivateCookieBanner() {
    localStorage.setItem("cookieBanner", "false");
  }

  public isRouteValid(page: Page): boolean {
    if (!environment.allowManualViewAccess && this._currentStep.page !== page) {
      this.redirectToCurrentStep();
      return false;
    }
    return true;
  }

  private redirectToCurrentStep() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(()=> { //Ensures component reload, even on same routing target
      this._router.navigate([this._currentStep.page]);
    });
  }
}
