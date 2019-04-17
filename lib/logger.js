/**
 * logger for create logFile as lambda_api.log to current dir.
 */
var winston = require("winston"),
  winstonFormat = winston.format,
  logger = winston.createLogger({
    level: "info",
    format: winstonFormat.combine(
      winstonFormat.timestamp(),
      winstonFormat.json()
    ),
    transports: [new winston.transports.File({ filename: "lambda_api.log" })]
  });
module.exports = logger;
