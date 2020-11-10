import express from "express";
import bodyParser from "body-parser";
import { logger } from "./utils/logger";
import http from "http";
import socketIO, { Socket } from "socket.io";
import cors from "cors";
import { getRandomWordsAndTarget } from "./utils/random";
import RoomData from "./types/RoomData";
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

let roomSizes = new Map<string, number>();
let roomData = new Map<string, RoomData>();
const httpServer = http.createServer(app);

const Server = socketIO.Server;
const io = new Server(httpServer);

io.on("connection", (client: Socket) => {
  let currRoom: string;
  // logger.info(`Socket [${client.id}] connected!`);

  client.on("joinroom", (roomName: string, callback: Function) => {
    console.log("Joined " + roomName);

    let created = false;
    currRoom = roomName;
    let data;

    //Room is being created
    if (!roomSizes.get(roomName)) {
      logger.info(`${roomName} has been created!`);
      roomSizes.set(roomName, 1);
      created = true;
      data = getRandomWordsAndTarget();
      roomData.set(roomName, data);
    }
    //Room already exists
    else {
      data = roomData.get(roomName);
      roomSizes.set(roomName, (roomSizes.get(roomName) as number) + 1);
    }
    console.log(data);

    client.join(roomName);
    callback(data);
  });

  client.on("generategame", (roomName) => {
    let generatedValues = getRandomWordsAndTarget();
    io.to(roomName).emit("generated", generatedValues);
  });

  client.on("disconnect", () => {
    if (!roomSizes.get(currRoom)) return;
    if ((roomSizes.get(currRoom) as number) <= 1) {
      roomSizes.delete(currRoom);
      logger.info(`${currRoom} has been deleted`);
    } else {
      roomSizes.set(currRoom, (roomSizes.get(currRoom) as number) - 1);
    }

    // logger.info(`Socket [${client.id}] has disconnected`);
  });
});

export default httpServer;

export { io };
