import { AfterViewChecked, Component, ElementRef, EventEmitter, HostListener, Input, model, OnDestroy, OnInit, Output, signal, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import { TaggingEvents } from '../..//services/tagging-events';
import { Web } from '../../services/web';
import { SimpleTag } from '../../types/Tag';
import { environment as env } from '../../../../environments/environment';
import { Tutorial } from './tutorial/tutorial';
import { MatIconModule } from '@angular/material/icon';
import { Tag } from '../tag/tag';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const SEPARATORS = [
  " ",
  ",",
  ";",
  "."
]

@Component({
  selector: 'app-tagging-container',
  imports: [MatIconModule, MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule, Tag],
  templateUrl: './tagging-container.html',
  styleUrl: './tagging-container.scss',
  host: {
    '[style.--remove-tag-duration]': 'removeTagDuration'
  }
})
export class TaggingContainer implements OnInit, OnDestroy, AfterViewChecked {
  
  @Input() triggerTutorialEvent?: Observable<MatDialogConfig>;

  @Output() onTutorialClosed = new EventEmitter<void>();
  @Output() onEmitTags = new EventEmitter<string[]>();

  tagInput = model("");
  tags = signal<SimpleTag[]>([]);
  disableButton = signal(false);

  allowZeroTags = env.allowZeroTags;

  private _requestSubscription: Subscription;

  @ViewChild('tagContainer') private _tagContainerRef?: ElementRef;
  
  private _triggerTutorialSubscription?: Subscription;

  constructor(private tagService: TaggingEvents, private dialog: MatDialog, private _webService: Web) {
    this._requestSubscription = this._webService.subscribeToRequesting((requesting) => {
      this.disableButton.set(requesting);
    });
  }

  get removeTagDuration(): string {
    return `${0.5 / env.animationSpeedFactor}s`;
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
  blockPaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  public onCharacterInput() {
    // If last char of input equals one of the separators
    for(let char of this.tagInput()) {
      if(SEPARATORS.includes(char)) {
        const tags = this.tagInput().split(char);
        for(let tag of tags) {
          if(tag) this.addTag(tag);
        }
        return;
      }
    }
  }

  public onDeleteTag(tag: string) {
    for(let i = 0; i < this.tags().length; i++) {
      if(this.tags()[i].value === tag) {
        let del: SimpleTag[] = []

        this.tags.update(currTags => {
          const copy = [...currTags]
          del = copy.splice(i, 1)
          return copy
        })
        
        this.tagService.notifyTagDeleted(del[0].value);
        return;
      }
    }
  }

  public emitTags() {
    const tagValues = this.tags().map((tag) => {
      return tag.value;
    });

    this.onEmitTags.emit(tagValues);
  }

  public addTag(tag?: string) {
    if(this.tagInput() === "" && !tag) return;

    const value = tag ? tag.toLocaleLowerCase() : this.tagInput().toLocaleLowerCase();

    const existingTag = this.tags().find((tag) => {
      return tag.value === value;
    });

    if(!existingTag) { // New Tag
      this.tags.update(currTags => [
        ...currTags,
        {
          value: value,
          duplicateSubject: new Subject<void>()
        }
      ])

      this.tagService.notifyNewTag(value);
    }
    else { // Trigger duplicate warning
      existingTag.duplicateSubject?.next();
    }

    this.tagInput.set("");
  }

  private showTaggingTutorial(config: MatDialogConfig) {
    const dialogRef = this.dialog.open(Tutorial, config);
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
