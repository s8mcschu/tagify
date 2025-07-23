import { animate, query, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import { TaggingEventsService } from 'src/app/services/tagging-events.service';
import { WebService } from 'src/app/services/web.service';
import { SimpleTag } from 'src/app/types/Tag';
import { environment as env } from 'src/environments/environment';
import { TaggingTutorialDialogComponent } from './tutorial/tagging-tutorial-dialog.component';

const SEPARATORS = [
  " ",
  ",",
  ";",
  "."
]

@Component({
  selector: 'tp-tagging-container',
  templateUrl: './tagging-container.component.html',
  styleUrls: ['./tagging-container.component.scss'],
  animations: [
    trigger('removeTag', [
      transition(':leave', [
        query(':leave', [
          style({opacity: 1}),
          animate(`${(0.5 / env.animationSpeedFactor)}s`, style({opacity: 0}))
        ], { optional: true })
      ])
    ])
  ]
})
export class TaggingContainerComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input() triggerTutorialEvent?: Observable<MatDialogConfig>;

  @Output() onTutorialClosed = new EventEmitter<void>();
  @Output() onEmitTags = new EventEmitter<string[]>();

  public tagInput: string;
  public tags: SimpleTag[];
  public allowZeroTags: boolean;
  public disableButton: boolean;

  private _requestSubscription: Subscription;

  @ViewChild('tagContainer') private _tagContainerRef?: ElementRef;
  
  private _triggerTutorialSubscription?: Subscription;

  constructor(private tagService: TaggingEventsService, private dialog: MatDialog, private _webService: WebService) {
    this.tagInput = "";
    this.tags = [];
    this.allowZeroTags = env.allowZeroTags;
    this.disableButton = false;
    this._requestSubscription = this._webService.subscribeToRequesting((requesting) => {
      this.disableButton = requesting;
    });
  }

  ngOnInit(): void {
    this._triggerTutorialSubscription = this.triggerTutorialEvent?.subscribe(config => this.showTaggingTutorial(config));
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this._triggerTutorialSubscription?.unsubscribe();
    this._requestSubscription.unsubscribe();
  }

  @HostListener('paste', ['$event'])
  blockPaste(event: KeyboardEvent) {
    event.preventDefault();
  }

  public onCharacterInput() {
    // If last char of input equals one of the separators
    for(let char of this.tagInput) {
      if(SEPARATORS.includes(char)) {
        const tags = this.tagInput.split(char);
        for(let tag of tags) {
          if(tag) this.addTag(tag);
        }
        return;
      }
    }
  }

  public onDeleteTag(tag: string) {
    for(let i = 0; i < this.tags.length; i++) {
      if(this.tags[i].value === tag) {
        const del = this.tags.splice(i, 1);
        this.tagService.notifyTagDeleted(del[0].value);
        return;
      }
    }
  }

  public emitTags() {
    const tagValues = this.tags.map((tag) => {
      return tag.value;
    });

    this.onEmitTags.emit(tagValues);
  }

  public addTag(tag?: string) {
    if(this.tagInput === "" && !tag) return;

    const value = tag ? tag.toLocaleLowerCase() : this.tagInput.toLocaleLowerCase();

    const existingTag = this.tags.find((tag) => {
      return tag.value === value;
    });

    if(!existingTag) { // New Tag
      this.tags.push({
        value: value,
        duplicateSubject: new Subject<void>()
      });

      this.tagService.notifyNewTag(value);
    }
    else { // Trigger duplicate warning
      existingTag.duplicateSubject?.next();
    }

    this.tagInput = "";
  }

  private showTaggingTutorial(config: MatDialogConfig) {
    const dialogRef = this.dialog.open(TaggingTutorialDialogComponent, config);
    dialogRef.afterClosed().subscribe(() => {
      this.onTutorialClosed.emit();
    });
  }

  private scrollToBottom() {
    try {
      if(this._tagContainerRef) {
        this._tagContainerRef.nativeElement.scrollTop = this._tagContainerRef?.nativeElement.scrollHeight;
      }
    } catch(err) { }  
  }
}
