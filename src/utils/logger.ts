import pino from "pino";
import { APP_ID, LOG_LEVEL } from "./config";

export const logger = pino({
  name: "wavelength-backend",
  level: "debug",
  prettyPrint: {
    colorize: true,
    levelFirst: false,
    ignore: "pid,hostname,name",
  },
  timestamp: () => {
    const time = new Date().toLocaleString().split(", ")[1];
    return `, "time":"${time}"`;
  },
});
