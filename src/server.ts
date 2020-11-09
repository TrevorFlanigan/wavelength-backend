import express from "express";
import bodyParser from "body-parser";
import { logger } from "./utils/logger";
import http from "http";
import cors from "cors";
const app = express();

const httpServer = http.createServer(app);

app.use(bodyParser.json());
app.get("/", (req, res) => {
  logger.info("Hello");
  res.send("Express server");
});

const io = require("socket.io")(httpServer);
console.log(io);

io.on("connection", () => {
  logger.info("User Connected");
});
export default httpServer;
