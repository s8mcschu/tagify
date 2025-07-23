import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ImageTutorialDialogComponent } from './tutorial/image-tutorial-dialog.component';

@Component({
  selector: 'tp-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit, OnDestroy {

  @Input() triggerTutorialEvent?: Observable<MatDialogConfig>;
  @Input() imgSrc: string;

  @Output() onTutorialClosed = new EventEmitter<void>();
  @Output() onImageLoaded = new EventEmitter<void>();

  private _triggerTutorialSubscription?: Subscription;

  constructor(private dialog: MatDialog) { 
    this.imgSrc = "";
  }

  ngOnInit(): void {
    this._triggerTutorialSubscription = this.triggerTutorialEvent?.subscribe(config => this.showImageTutorial(config));
  }

  ngOnDestroy(): void {
    this._triggerTutorialSubscription?.unsubscribe();
  }

  onImgLoaded(event: any) {
    this.onImageLoaded.emit();
  }

  private showImageTutorial(config: MatDialogConfig): void {
    const dialogRef = this.dialog.open(ImageTutorialDialogComponent, config);
    dialogRef.afterClosed().subscribe(() => {
      this.onTutorialClosed.emit();
    });
  }
}
