import { Type } from "@angular/core";
import { Badges } from "../components/game-elements/badges/badges";
import { GameElementComponent } from "../components/game-elements/game-element-component";
import { Leaderboard } from "../components/game-elements/leaderboard/leaderboard";
import { PointsAndBadges } from "../components/game-elements/points-and-badges/points-and-badges";
import { Points } from "../components/game-elements/points/points";
import { Levels } from "../components/game-elements/levels/levels";

export type GamificationType = 
  "NONE" 
  | "POINTS" 
  | "BADGES" 
  | "LEVEL"
  | "LEADERBOARD"
  | "POINTS-AND-BADGES"

// Map the Gamification Types to their respective components; Allows dynamic loading of Game Element at run-time
// The "key" string should be used for reference in the user script.
export const GamificationMapper: {[key: string]: Type<GameElementComponent>} = {
  "POINTS": Points,
  "BADGES": Badges,
  "LEVEL": Levels,
  "LEADERBOARD": Leaderboard,
  "POINTS-AND-BADGES": PointsAndBadges,
}
