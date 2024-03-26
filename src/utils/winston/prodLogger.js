const winston = require('winston')
const customWinston = require('./custom.logger')

// winston.addColors(customWinston.colors)

const winstonLogger = winston.createLogger({
  levels: customWinston.levels,
  transports: [
    new winston.transports.Console({
      level: 'http',
      format: winston.format.combine(
        winston.format.colorize({ colors: customWinston.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'info',
      format: winston.format.simple(),
    }),
  ],
})

module.exports = winstonLogger