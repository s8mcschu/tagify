import { Type } from "@angular/core";
import { BadgesComponent } from "../components/game-elements/badges/badges.component";
import { GameElementComponent } from "../components/game-elements/game-element-component";
import { LeaderboardComponent } from "../components/game-elements/leaderboard/leaderboard.component";
import { PointsAndBadgesComponent } from "../components/game-elements/points-and-badges/points-and-badges.component";
import { PointsComponent } from "../components/game-elements/points/points.component";

export type GamificationType = 
  "NONE" 
  | "POINTS" 
  | "BADGES" 
  | "LEADERBOARD"
  | "POINTS-AND-BADGES"

// Map the Gamification Types to their respective components; Allows dynamic loading of Game Element at run-time
// The "key" string should be used for reference in the user script.
export const GamificationMapper: {[key: string]: Type<GameElementComponent>} = {
  "POINTS": PointsComponent,
  "BADGES": BadgesComponent,
  "LEADERBOARD": LeaderboardComponent,
  "POINTS-AND-BADGES": PointsAndBadgesComponent,
}