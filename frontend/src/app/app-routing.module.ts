import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbortPageComponent } from './views/abort-page/abort-page.component';
import { GoodbyePageComponent } from './views/goodbye-page/goodbye-page.component';
import { InstructionViewComponent } from './views/instruction-view/instruction-view.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { PageNotFoundViewComponent } from './views/page-not-found-view/page-not-found-view.component';
import { QuestionnaireViewComponent } from './views/questionnaire-view/questionnaire-view.component';
import { SaveAndExitPageComponent } from './views/save-and-exit-page/save-and-exit-page.component';
import { SoundCalibrationViewComponent } from './views/sound-calibration-view/sound-calibration-view.component';
import { TaggingViewComponent } from './views/tagging-view/tagging-view.component';

const routes: Routes = [
  { path: 'welcome', component: LandingPageComponent },
  { path: 'survey', component: QuestionnaireViewComponent },
  { path: 'tagging', component: TaggingViewComponent },
  { path: 'calibration', component: SoundCalibrationViewComponent },
  { path: 'instruction', component: InstructionViewComponent },
  { path: 'end', component: GoodbyePageComponent },
  { path: 'saveAndExit', component: SaveAndExitPageComponent },
  { path: 'aborted', component: AbortPageComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: "**", component: PageNotFoundViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
