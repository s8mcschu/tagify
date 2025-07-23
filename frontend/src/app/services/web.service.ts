import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { GamificationType } from '../types/Gamification';
import { QuestionnaireCollection } from '../types/Questionnaires';
import { TaggingDescriptor, Step } from '../types/Step';
import { Tag } from '../types/Tag';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private serverURL = env.serverURL
  private requesting$ = new Subject<boolean>();

  constructor(private http: HttpClient, private _session: SessionService, private _snackBar: MatSnackBar) {}

  async createUser() {
    this.requesting$.next(true);
    return new Promise<void>((resolve, reject) => {
      this.http.put(this.serverURL + '/user', {}, { withCredentials: true }).subscribe({
        next: () => {
          resolve();
          this.requesting$.next(false);
        },
        error: (err) => {
          this.toastError(err);
          this.requesting$.next(false);
          reject(err);
        }
      });
    });
  }

  async getCurrentStep() {
    this.requesting$.next(true);
    return new Promise<Step>((resolve, reject) => {
      this.http.get<Step>(this.serverURL + '/user/state', { withCredentials: true }).subscribe({
        next: (step) => {
          if(step.page === "tagging") {
            const content = step.content as TaggingDescriptor;
            content.gamification = content.gamification?.toUpperCase() as GamificationType;
          }
          this.requesting$.next(false);
          resolve(step);
        },
        error: (err) => {
          this.toastError(err);
          this.requesting$.next(false);
          reject(err);
        }
      });
    });
  }

  async updateAndGetNextStep() {
    this.requesting$.next(true);
    this._session.loading = true;
    return new Promise<Step>((resolve, reject) => {
      this.http.patch<Step>(this.serverURL + '/user/nextState', { currentStep: this._session.currentStep.number }, { withCredentials: true }).subscribe({
        next: (step) => {
          if(step.page === "tagging") {
            const content = step.content as TaggingDescriptor;
            content.gamification = content.gamification?.toUpperCase() as GamificationType;
          }

          this._session.currentStep = step;
          this._session.loading = false;
          this.requesting$.next(false);
          resolve(step);
        },
        error: (err) => {
          this._session.loading = false;
          this.requesting$.next(false);
          this.toastError(err);
          reject(err);
        }
      })
    });
  }

  async getTagHistory() {
    this.requesting$.next(true);
    return new Promise<Tag[]>((resolve, reject) => {
      this.http.get<Tag[]>(this.serverURL + '/tags', { withCredentials: true }).subscribe({
        next: (tags) => {
          this.requesting$.next(false);
          resolve(tags);
        },
        error: (err) => {
          this.toastError(err);
          this.requesting$.next(false);
          reject(err);
        }
      })
    })
  }

  async getTagHistoryCurrentStep() {
    this.requesting$.next(true);
    return new Promise<Tag[]>((resolve, reject) => {
      this.http.get<Tag[]>(this.serverURL + '/tags/step', { withCredentials: true }).subscribe({
        next: (tags) => {
          this.requesting$.next(false);
          resolve(tags);
        },
        error: (err) => {
          this.toastError(err);
          this.requesting$.next(false);
          reject(err);
        }
      })
    })
  }

  async submitConsent() {
    this.requesting$.next(true);
    return new Promise<void>((resolve, reject) => {
      this.http.patch(this.serverURL + '/consent', { consent: true }, { withCredentials: true }).subscribe({
        next: () => {
          this.requesting$.next(false);
          resolve();
        },
        error: (err) => {
          this.toastError(err);
          this.requesting$.next(false);
          reject(err);
        }
      });
    });
  }

  async revokeConsent() {
    this.requesting$.next(true);
    return new Promise<void>((resolve, reject) => {
      this.http.patch(this.serverURL + '/consent', { consent: false }, { withCredentials: true }).subscribe({
        next: () => {
          this.requesting$.next(false);
          resolve();
        },
        error: (err) => {
          this.toastError(err);
          this.requesting$.next(false);
          reject(err);
        }
      });
    });
  }

  async submitCalibration(val: number) {
    this.requesting$.next(true);
    return new Promise<void>((resolve, reject) => {
      this.http.patch(this.serverURL + '/calibration', { value: val }, { withCredentials: true }).subscribe({
        next: () => {
          this.requesting$.next(false);
          resolve();
        },
        error: (err) => {
          this.toastError(err);
          this.requesting$.next(false);
          reject(err);
        }
      });
    });
  }

  async submitQuestionnaires(questionnaires: QuestionnaireCollection) {
    this.requesting$.next(true);
    return new Promise<void>((resolve, reject) => {
      this.http.post(this.serverURL + '/questionnaire', { questionnaires }, { withCredentials: true }).subscribe({
        next: () => {
          this.requesting$.next(false);
          resolve();
        },
        error: (err) => {
          this.toastError(err);
          this.requesting$.next(false);
          reject(err);
        }
      });
    });
  }

  async submitTags(tags: Tag[]) {
    this.requesting$.next(true);
    return new Promise<void>((resolve, reject) => {
      this.http.post(this.serverURL + '/tags', { tags }, { withCredentials: true}).subscribe({
        next: () => {
          this.requesting$.next(false);
          resolve();
        },
        error: (err) => {
          this.toastError(err);
          this.requesting$.next(false);
          reject(err);
        }
      });
    });
  }

  async submitAbort() {
    this.requesting$.next(true);
    return new Promise<void>((resolve, reject) => {
      this.http.patch(this.serverURL + '/abort', {}, { withCredentials: true }).subscribe({
        next: () => {
          this._session.currentStep = { page: "aborted" };
          this.requesting$.next(false);
          resolve();
        },
        error: (err) => {
          this.toastError(err);
          this.requesting$.next(false);
          reject(err);
        }
      });
    });
  }

  public subscribeToRequesting(next: (val: boolean) => void) {
    return this.requesting$.subscribe(next);
  }

  private toastError(error: any) {
    this._snackBar.open(JSON.stringify(error.statusText), 'Dismiss', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
