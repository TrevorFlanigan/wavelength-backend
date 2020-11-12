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

app.get("/", (req, res) => {
  logger.info("Hello");
  res.send("Express server");
});

// app.use("/rooms", rooms);

// let roomSizes = new Map<string, number>();
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
          userList: userList,
          gameState: GameState["NOT_STARTED"],
          leftTeam: leftTeam,
          leftPsychics: new Set<string>().add(client.id),
          leftTurn: true,
          currPsychic: "",
          rightPsychics: new Set<string>(),
          rightTeam: new Map<string, string>(),
          leftScore: 0,
          rightScore: 0
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
      console.log(formatData);

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
    } else {
      update.rightTeam.set(client.id, name);
      update.leftTeam.delete(client.id);
      update.leftPsychics.delete(client.id);
    }
    roomData.set(roomName, update);
    io.to(roomName).emit(
      "updateteams",
      Array.from(update.leftTeam.values()),
      Array.from(update.rightTeam.values())
    );

    callback();
  });

  client.on("startgame", (roomName) => {
    let room = roomData.get(roomName) as RoomData;
    room.gameState = GameState["TEAM1_GUESS"];
    let startPsychic = getRandomItem(room.leftPsychics);
    room.leftPsychics.delete(startPsychic);
    room.leftTurn = true;
    room.currPsychic = startPsychic;
    console.log(room.currPsychic);
    let currPsychicName = room.userList.get(room.currPsychic);
    roomData.set(roomName, room);

    io.to(roomName).emit("startedgame", room.gameState);
    io.to(startPsychic).emit("youarepsychic");
    io.to(roomName).emit("psychicchosen", room.leftTurn, currPsychicName);
  });

  client.on("guess", (roomName, value) => {
    let room = roomData.get(roomName) as RoomData;
    let {gameState, goal} = room;
    let diff = Math.abs(goal - value);
    
    let points;
    if (diff >= 0 && diff <= 2) points = 4;
    else if (diff > 2 && diff <= 12) points = 3;
    else if (diff > 12 ) 
  })
  client.on("changevalue", (roomName, value) => {
    io.to(roomName).emit("valuechanged", value);
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
      console.log(data);
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
