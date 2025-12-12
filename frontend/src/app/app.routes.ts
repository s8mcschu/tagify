import { Routes, RouterModule } from '@angular/router';
import { AbortPage } from "./views/abort-page/abort-page";
import { GoodbyePage } from './views/goodbye-page/goodbye-page';
import { InstructionView } from './views/instruction-view/instruction-view';
import { LandingPage } from './views/landing-page/landing-page';
import { PageNotFoundView } from './views/page-not-found-view/page-not-found-view';
import { QuestionnaireView } from './views/questionnaire-view/questionnaire-view';
import { SaveAndExitPage } from './views/save-and-exit-page/save-and-exit-page';
import { SoundCalibrationView } from './views/sound-calibration-view/sound-calibration-view';
import { TaggingView } from './views/tagging-view/tagging-view';

export const routes: Routes = [
  { path: 'welcome', component: LandingPage },
  { path: 'survey', component: QuestionnaireView },
  { path: 'tagging', component: TaggingView },
  { path: 'calibration', component: SoundCalibrationView },
  { path: 'instruction', component: InstructionView },
  { path: 'end', component: GoodbyePage },
  { path: 'saveAndExit', component: SaveAndExitPage },
  { path: 'aborted', component: AbortPage },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: "**", component: PageNotFoundView }
];
