import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ANGULAR MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card'; 

// VIEWS
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { TaggingViewComponent } from './views/tagging-view/tagging-view.component';
import { QuestionnaireViewComponent } from './views/questionnaire-view/questionnaire-view.component';
import { GoodbyePageComponent } from './views/goodbye-page/goodbye-page.component';
import { PageNotFoundViewComponent } from './views/page-not-found-view/page-not-found-view.component';
import { ScreenTooSmallViewComponent } from './views/screen-too-small-view/screen-too-small-view.component';

// APP COMPONENTS
import { GamificationContainerComponent } from './components/gamification-container/gamification-container.component';
import { ImageContainerComponent } from './components/image-container/image-container.component';
import { TaggingContainerComponent } from './components/tagging-container/tagging-container.component';
import { TagComponent } from './components/tag/tag.component';
import { DataPrivacyDialogComponent } from './components/dialogs/data-privacy-dialog/data-privacy-dialog.component';
import { ImprintDialogComponent } from './components/dialogs/imprint-dialog/imprint-dialog.component';
import { TaggingTutorialDialogComponent } from './components/tagging-container/tutorial/tagging-tutorial-dialog.component';
import { ImageTutorialDialogComponent } from './components/image-container/tutorial/image-tutorial-dialog.component';
import { AbortDialogComponent } from './components/dialogs/abort-dialog/abort-dialog.component';
import { AbortPageComponent } from './views/abort-page/abort-page.component';
import { SaveAndExitPageComponent } from './views/save-and-exit-page/save-and-exit-page.component';
import { SoundCalibrationViewComponent } from './views/sound-calibration-view/sound-calibration-view.component';
import { InstructionViewComponent } from './views/instruction-view/instruction-view.component';

// APP DIRECTIVES
import { CounterDirective } from './directives/counter.directive';
import { GameElementHostDirective } from './directives/game-element-host.directive';

// APP PIPES
import { TimeConverterPipe } from './pipes/time-converter.pipe';
import { CeilPipe } from './pipes/ceil.pipe';

// GAME ELEMENTS
import { PointsComponent } from './components/game-elements/points/points.component';
import { LeaderboardComponent } from './components/game-elements/leaderboard/leaderboard.component';
import { BadgesComponent } from './components/game-elements/badges/badges.component';
import { PointsAndBadgesComponent } from './components/game-elements/points-and-badges/points-and-badges.component';
import { LevelsComponent } from './components/game-elements/levels/levels.component';

import { BadgesTutorialComponent } from './components/game-elements/badges/tutorial/badges-tutorial.component';
import { LeaderboardTutorialComponent } from './components/game-elements/leaderboard/tutorial/leaderboard-tutorial.component';
import { PointsTutorialComponent } from './components/game-elements/points/tutorial/points-tutorial.component';
import { PointsAndBadgesTutorialComponent } from './components/game-elements/points-and-badges/tutorial/points-and-badges-tutorial.component';
import { LevelsTutorialComponent } from './components/game-elements/levels/tutorial/levels-tutorial.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    TaggingViewComponent,
    QuestionnaireViewComponent,
    GoodbyePageComponent,
    GamificationContainerComponent,
    ImageContainerComponent,
    TaggingContainerComponent,
    PointsComponent,
    LeaderboardComponent,
    BadgesComponent,
    PointsAndBadgesComponent,
    PageNotFoundViewComponent,
    TagComponent,
    ScreenTooSmallViewComponent,
    CounterDirective,
    DataPrivacyDialogComponent,
    ImprintDialogComponent,
    TimeConverterPipe,
    CeilPipe,
    BadgesTutorialComponent,
    LeaderboardTutorialComponent,
    PointsTutorialComponent,
    PointsAndBadgesTutorialComponent,
    TaggingTutorialDialogComponent,
    GameElementHostDirective,
    ImageTutorialDialogComponent,
    AbortDialogComponent,
    AbortPageComponent,
    SaveAndExitPageComponent,
    LevelsComponent,
    LevelsTutorialComponent,
    SoundCalibrationViewComponent,
    InstructionViewComponent,
    AutoFocusDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
