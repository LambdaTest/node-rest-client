/**
 * logger for create logFile as lambda_api.log to current dir if path is not passed by User.
 */
var winston = require("winston");
module.exports = function(logFile) {
  var winstonFormat = winston.format;
  return winston.createLogger({
    level: "info",
    format: winstonFormat.combine(
      winstonFormat.timestamp(),
      winstonFormat.json()
    ),
    transports: [new winston.transports.File({ filename: logFile ? logFile : "lambda_api.log" })]
  });
};
