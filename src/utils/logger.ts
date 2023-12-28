import pino from "pino";

const logger = pino({
  transport: {
    target: process.env.NODE_ENV !== "production" ? "pino-pretty" : "",
    options: {
      colorize: true,
    },
  },
});

export default logger;
