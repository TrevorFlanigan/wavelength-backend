import express from "express";
import bodyParser from "body-parser";
import { logger } from "./utils/logger";
import http from "http";
import socketIO, { Socket } from "socket.io";
import cors from "cors";
import { getRandomWordsAndTarget } from "./utils/random";
import RoomData from "./types/RoomData";
import { format } from "path";
import GameState from "./types/GameState";
import path from "path";
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

app.use(cors());

// app.get("/", (req, res) => {
//   logger.info("Hello");
//   res.send("Express server");
// });

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "..", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});
// }

let roomData = new Map<string, RoomData>();
const httpServer = http.createServer(app);

const Server = socketIO.Server;
const io = new Server(httpServer);

type Team = "left" | "right";

const getRandomItem = (set: Set<any>) => {
  let items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
};
io.on("connection", (client: Socket) => {
  let currRoom: string;
  // logger.info(`Socket [${client.id}] connected!`);

  client.on(
    "joinroom",
    (roomName: string, name: string, callback: Function) => {
      logger.info("Joined " + roomName);
      currRoom = roomName;
      let data: RoomData;
      let currTeam;

      //Room is being created
      let created = false;
      if (!roomData.get(roomName)) {
        created = true;
        logger.info(`${roomName} has been created!`);
        let wordsAndTarget = getRandomWordsAndTarget();
        let userList = new Map<string, string>();
        let leftTeam = new Map<string, string>();
        currTeam = "left";
        leftTeam.set(client.id, name);
        userList.set(client.id, name);
        data = {
          ...wordsAndTarget,
          maxScore: 10,
          userList: userList,
          gameState: GameState["NOT_STARTED"],
          leftTeam: leftTeam,
          leftPsychics: new Set<string>().add(client.id),
          leftTurn: true,
          currPsychic: "",
          rightPsychics: new Set<string>(),
          rightTeam: new Map<string, string>(),
          leftScore: 0,
          rightScore: 0,
        };
        roomData.set(roomName, data);
      }
      //Room already exists
      else {
        let updateData = roomData.get(roomName) as RoomData;
        updateData.userList.set(client.id, name);
        roomData.set(roomName, updateData);
        data = updateData;

        /** Handler for joining mid-game, adds user to list of available psychics */
        if (data.leftTeam.size <= data.rightTeam.size) {
          data.leftTeam.set(client.id, name);
          data.leftPsychics.add(client.id);
          currTeam = "left";
        } else {
          data.rightTeam.set(client.id, name);
          data.rightPsychics.add(client.id);
          currTeam = "right";
        }
      }
      let formatData = {
        ...data,
        currPsychic: data.userList.get(data.currPsychic),
        userList: Array.from(data.userList.values()),
        leftTeam: Array.from(data.leftTeam.values()),
        rightTeam: Array.from(data.rightTeam.values()),
      };

      client.join(roomName);
      io.to(roomName).emit("updateuserlist", formatData.userList);
      io.to(roomName).emit(
        "updateteams",
        formatData.leftTeam,
        formatData.rightTeam
      );

      callback(formatData, currTeam);
    }
  );

  client.on("generategame", (roomName) => {
    let generatedValues = getRandomWordsAndTarget();
    io.to(roomName).emit("generated", generatedValues);
  });

  client.on("changetoteam", (roomName, toChange: Team, name, callback) => {
    let update = roomData.get(roomName);
    if (!update) return;
    if (toChange === "left") {
      update.leftTeam.set(client.id, name);
      update.rightTeam.delete(client.id);
      update.rightPsychics.delete(client.id);
      update.leftTeam.set(client.id, name);
      update.leftPsychics.add(client.id);
    } else {
      update.rightTeam.set(client.id, name);
      update.leftTeam.delete(client.id);
      update.leftPsychics.delete(client.id);
      update.rightTeam.set(client.id, name);
      update.rightPsychics.add(client.id);
    }
    roomData.set(roomName, update);
    io.to(roomName).emit(
      "updateteams",
      Array.from(update.leftTeam.values()),
      Array.from(update.rightTeam.values())
    );

    callback();
  });

  client.on("startgame", (roomName, maxScore) => {
    let room = roomData.get(roomName) as RoomData;
    room.maxScore = maxScore;
    room.gameState = GameState["TEAM1_GUESS"];
    let startPsychic = getRandomItem(room.leftPsychics);
    room.leftPsychics.delete(startPsychic);
    room.leftTurn = true;
    room.currPsychic = startPsychic;
    let currPsychicName = room.userList.get(room.currPsychic);
    roomData.set(roomName, room);

    io.to(roomName).emit("setgamestate", room.gameState);
    io.to(startPsychic).emit("youarepsychic");
    io.to(roomName).emit("psychicchosen", room.leftTurn, currPsychicName);
  });

  client.on("guess", (roomName, value) => {
    let room = roomData.get(roomName) as RoomData;
    let { gameState, goal, leftTurn } = room;
    if (
      gameState !== GameState["TEAM1_GUESS"] &&
      gameState !== GameState["TEAM2_GUESS"]
    )
      return;
    let diff = Math.abs(goal - value);

    let points = 0;
    if (diff >= 0 && diff <= 2) points = 4;
    else if (diff > 2 && diff <= 6) points = 3;
    else if (diff > 6 && diff <= 10) points = 2;

    if (leftTurn) room.leftScore += points;
    else room.rightScore += points;

    let newGameState = gameState + 1;
    room.gameState = newGameState;
    roomData.set(roomName, room);

    /** Switches to TEAMX_STEAL
     * Psychic stays the same.
     * Guess button is deactivated.
     * Input slider is deactivated.
     * Left/Right buttons activated.
     */
    io.to(roomName).emit("updatestate", newGameState);
    // io.to(roomName).emit(
    //   "updatescore",
    //   room.leftScore,
    //   room.rightScore,
    //   newGameState
    // );
  });

  client.on("steal", (roomName, direction, value) => {
    let room = roomData.get(roomName) as RoomData;
    if (
      room.gameState !== GameState["TEAM1_STEAL"] &&
      room.gameState !== GameState["TEAM2_STEAL"]
    )
      return;
    let points = 0;
    if (direction === "left" && value > room.goal) {
      points = 1;
    } else if (direction === "right" && value < room.goal) {
      points = 1;
    }

    if (room.leftTurn) room.rightScore += points;
    else room.leftScore += points;

    let newGameState = room.gameState + 1;
    room.gameState = newGameState;
    roomData.set(roomName, room);

    io.to(roomName).emit("updatestate", newGameState);
    // io.to(roomName).emit("updatescore", room.leftScore, room.rightScore);
  });

  client.on("changevalue", (roomName, value) => {
    io.to(roomName).emit("valuechanged", value);
  });

  client.on("show", (roomName) => {
    let room = roomData.get(roomName) as RoomData;
    io.to(roomName).emit("showingtarget");
    io.to(roomName).emit("updatescore", room.leftScore, room.rightScore);
  });

  client.on("continue", (roomName) => {
    let room = roomData.get(roomName) as RoomData;

    if (
      room.gameState !== GameState["TEAM1_END"] &&
      room.gameState !== GameState["TEAM2_END"]
    )
      return;
    room.leftTurn = !room.leftTurn;
    if (room.gameState === GameState["TEAM1_END"]) {
      room.gameState = GameState["TEAM2_GUESS"];
    } else {
      room.gameState = GameState["TEAM1_GUESS"];
    }

    if (room.leftScore >= room.maxScore || room.rightScore >= room.maxScore) {
      room.gameState = GameState["GAME_OVER"];
      logger.debug("Game should be over");
      if (room.leftScore >= room.maxScore && room.rightScore >= room.maxScore) {
        if (room.leftScore > room.rightScore) {
          io.to(roomName).emit("winner", "left");
        } else if (room.leftScore < room.rightScore) {
          io.to(roomName).emit("winner", "left");
        } else {
          io.to(roomName).emit("winner", "tie");
        }
      } else if (room.leftScore >= room.maxScore) {
        io.to(roomName).emit("winner", "left");
      } else {
        io.to(roomName).emit("winner", "right");
      }
      return;
    }

    let wordsAndTarget = getRandomWordsAndTarget();
    let nextPsychic;
    if (room.leftTurn) {
      if (room.leftPsychics.size == 0) {
        room.leftPsychics = new Set<string>(room.leftTeam.keys());
        console.log("Emptied, refilling");
        console.log(room.leftPsychics);
      }
      nextPsychic = getRandomItem(room.leftPsychics);
      room.leftPsychics.delete(nextPsychic);
      room.currPsychic = nextPsychic;
    } else {
      if (room.rightPsychics.size == 0) {
        room.rightPsychics = new Set<string>(room.rightTeam.keys());
      }
      nextPsychic = getRandomItem(room.rightPsychics);
      room.rightPsychics.delete(nextPsychic);
      room.currPsychic = nextPsychic;
    }
    let currPsychicName = room.userList.get(room.currPsychic);
    room.leftWord = wordsAndTarget.leftWord;
    room.rightWord = wordsAndTarget.rightWord;
    room.goal = wordsAndTarget.goal;

    roomData.set(roomName, room);
    io.to(roomName).emit("setgamestate", room.gameState);
    io.to(roomName).emit("generated", room);

    io.to(nextPsychic).emit("youarepsychic");
    io.to(roomName).emit("psychicchosen", room.leftTurn, currPsychicName);
    console.log(room);
  });

  client.on("restart", (roomName) => {
    let room = roomData.get(roomName) as RoomData;
    let wordsAndTarget = getRandomWordsAndTarget();
    room = {
      ...room,
      ...wordsAndTarget,
      maxScore: 10,
      gameState: GameState["NOT_STARTED"],
      leftTurn: true,
      currPsychic: "",
      leftPsychics: new Set<string>(room.leftTeam.keys()),
      rightPsychics: new Set<string>(room.rightTeam.keys()),
      leftScore: 0,
      rightScore: 0,
    };
    let formatData = {
      ...room,
      currPsychic: room.userList.get(room.currPsychic),
      userList: Array.from(room.userList.values()),
      leftTeam: Array.from(room.leftTeam.values()),
      rightTeam: Array.from(room.rightTeam.values()),
    };
    io.to(roomName).emit("restarted", formatData);
    io.to(roomName).emit("updatescore", 0, 0);
    roomData.set(roomName, room);
  });

  client.on("disconnect", () => {
    if (!roomData.get(currRoom)) return;
    let data = roomData.get(currRoom) as RoomData;

    if (data.currPsychic == client.id) {
      console.log("Psychic Left!");
      //handle psychic left
    }

    if (data.userList.size <= 1) {
      setTimeout(() => {
        if (data.userList.size <= 1) {
          roomData.delete(currRoom);
          logger.info(`${currRoom} has been deleted!`);
        }
      }, 1);
      data.userList.delete(client.id);
      data.leftTeam.delete(client.id);
      data.rightTeam.delete(client.id);
      data.leftPsychics.delete(client.id);
      data.rightPsychics.delete(client.id);
      roomData.set(currRoom, data);

      logger.info(`${currRoom} has been emptied!`);
    } else {
      data.userList.delete(client.id);
      data.leftTeam.delete(client.id);
      data.rightTeam.delete(client.id);
      data.leftPsychics.delete(client.id);
      data.rightPsychics.delete(client.id);

      io.to(currRoom).emit(
        "updateteams",
        Array.from(data.leftTeam.values()),
        Array.from(data.rightTeam.values())
      );
      io.to(currRoom).emit(
        "updateuserlist",
        Array.from(data.userList.values())
      );
      roomData.set(currRoom, data);
    }
  });
});

export default httpServer;

export { io };
