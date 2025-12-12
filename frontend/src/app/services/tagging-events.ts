import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Tag } from '../types/Tag';
import { Web } from './web';

@Injectable({
  providedIn: 'root'
})
export class TaggingEvents {
  
  private _tagCreatedSubject: Subject<string>;
  private _tagDeletedSubject: Subject<string>;
  private _imageViewSubject:  Subject<void>;
  private _tagViewSubject:  Subject<void>;

  constructor(private _webService: Web) {
    this._tagCreatedSubject = new Subject<string>();
    this._tagDeletedSubject = new Subject<string>();
    this._imageViewSubject = new Subject<void>();
    this._tagViewSubject = new Subject<void>();
  }

  // SUBSCRIPTIONS
  public onNewTag(next: (val: string) => void): Subscription {
    return this._tagCreatedSubject.subscribe(next);
  }

  public onTagDeleted(next: (val: string) => void): Subscription {
    return this._tagDeletedSubject.subscribe(next);
  }

  public onImageView(next: () => void): Subscription {
    return this._imageViewSubject.subscribe(next);
  }

  public onTagView(next: () => void): Subscription {
    return this._tagViewSubject.subscribe(next);
  }

  // EMITTER FUNCTIONS
  public notifyNewTag(tag: string): void {
    this._tagCreatedSubject.next(tag);
  }

  public notifyTagDeleted(tag: string): void {
    this._tagDeletedSubject.next(tag);
  }

  public notifyImageView(): void {
    this._imageViewSubject.next();
  }

  public notifyTagView(): void {
    this._tagViewSubject.next();
  }

  // ADDITIONAL FUNCTIONALITY
  public async getTagHistory(): Promise<Tag[]> {
    const tags = await this._webService.getTagHistory();
    return tags;
  }

  public async getTagHistoryCurrentStep(): Promise<Tag[]> {
    const tags = await this._webService.getTagHistoryCurrentStep();
    return tags;
  }
}
