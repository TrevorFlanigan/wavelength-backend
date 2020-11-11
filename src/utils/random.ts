import RoomData from "../types/RoomData";
import words from "./data";

const getRandomWords = () => {
  var pair = words[Math.floor(Math.random() * words.length)];
  return pair;
};

const getRandomTarget = () => {
  return Number.parseFloat((Math.random() * 100).toFixed(5));
};

type WordsAndTarget = {
  leftWord: string;
  rightWord: string;
  goal: number;
};

const generateRoomData = (): WordsAndTarget => {
  let raw = [...getRandomWords(), getRandomTarget()];
  let roomData = {
    leftWord: raw[0] as string,
    rightWord: raw[1] as string,
    goal: raw[2] as number,
  };
  return roomData;
};

export {
  getRandomWords,
  getRandomTarget,
  generateRoomData as getRandomWordsAndTarget,
};
