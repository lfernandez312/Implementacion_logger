const winston = require('winston')

const winstonLogger = winston.createLogger({
  transports: [new winston.transports.Console({ level: 'debug' })],
})

module.exports = winstonLogger