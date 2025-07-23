export interface Badge {
  name: string;
  icon: string;
  background?: string;
  fulfilled: boolean;
  checkCondition: () => boolean,
  tipp: string;
  progress?: number;
  level?: number;
}