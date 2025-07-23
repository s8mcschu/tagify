type Page = "welcome" | "survey" | "calibration" | "tagging" | "instruction" | "end" | "aborted";

export interface Step {
  page: Page;
  content?: string[] | GamificationDescriptor;
}

export interface GamificationDescriptor {
  gamification: string;
  hidden?: boolean;
  showFinalSummary?: boolean;
  tutorial: boolean;
  resourceIdx: number;
  resources: string[];
  shuffleResources?: boolean;
}