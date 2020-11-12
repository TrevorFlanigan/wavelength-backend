import GameState from "./GameState";

type RoomData = {
  goal: number;
  leftWord: string;
  rightWord: string;
  leftScore: number;
  rightScore: number;
  userList: Map<string, string>;
  gameState: GameState;
  leftTeam: Map<string, string>;
  leftTurn: boolean;
  leftPsychics: Set<string>;
  rightPsychics: Set<string>;
  rightTeam: Map<string, string>;
  currPsychic: string;
  maxScore: number;
};

export default RoomData;
