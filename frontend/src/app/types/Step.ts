import { GamificationType } from "./Gamification";

export type Page = "welcome" | "survey" | "calibration" | "tagging" | "instruction" | "end" | "aborted" | "saveAndExit";

export interface Step {
  number?: number;
  page: Page;
  content?: string[] | TaggingDescriptor | InstructionPageDescriptor | EndPageDescriptor;
}

export interface TaggingDescriptor {
  gamification?: GamificationType;
  hidden?: boolean;
  tutorial: boolean;
  resourceIdx: number;
  resources: string[];
}

export interface EndPageDescriptor {
  forwardUrl: string;
}


export interface InstructionPageDescriptor {
  heading: string;
  text: string;
}