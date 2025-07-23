import { Subject } from "rxjs";

export interface SimpleTag {
  value: string;
  duplicateSubject?: Subject<void>;
}

export interface Tag {
  value: string;
  resource: string;
}