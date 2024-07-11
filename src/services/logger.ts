import { Request } from "express"
// import { Response as GotResponse } from "got"
/*  eslint-disable-next-line @typescript-eslint/no-var-requires */
const winston = require("winston")
/*  eslint-disable-next-line @typescript-eslint/no-var-requires */
const expressWinston = require("express-winston")
/*  eslint-disable-next-line @typescript-eslint/no-var-requires */
const _ = require("lodash")

const loggerWinston = winston.createLogger({
  level: process.env.LOG_LEVEL ?? "debug",
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true,
    }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }: {timestamp: string, level: string, message: string}) => {
      return `[${timestamp}] ${level}: ${message}`
    })
  ),
})

const cleanBody = winston.format((info: { meta: { req: { body: string } } }) => {
  if (info?.meta?.req?.body) {
    try {
      info.meta.req.body = JSON.stringify(
        _.omit(info.meta.req.body, ["password", "secret", "token", "confirmPassword", "newPassword", "oldPassword", "currentPassword", "flow", "data"])
      )
    } catch {
      // invalid JSON
    }
  }
  return info
})

const formatLog = () =>
  winston.format.printf(({ meta, level, timestamp }: {meta: {res?: {statusCode: number}, req: Request}, timestamp: string, level: string}) => {
    const status = meta.res?.statusCode
    const color = status ? 
    (
      status >= 500
        ? 31 // red
        : status >= 400
        ? 33 // yellow
        : status >= 300
        ? 36 // cyan
        : status >= 200
        ? 32 // green
        : 0 // no color
    ) : 0 // no color
    return `[${timestamp}] ${level}: HTTP ${"\x1b[" + color + "m" + status + "\x1b[0m"} ${meta.req.method} ${meta.req.url} ${
      meta.req.body ?? ""
    }`
  })

expressWinston.requestWhitelist.push("query")
expressWinston.requestWhitelist.push("body")
expressWinston.responseWhitelist.push("body")

loggerWinston.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
    }),
  ],
  meta: true,
  colorize: true,
  format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), cleanBody(), formatLog()),
  msg: "",
  ignoreRoute(req: Request, res: Response) {
    if(!req && !res)
      logger.debug(`ignoreRoute issue`)
    return false
  },
})

const toString = (e: unknown) => {
  if (typeof e === 'object')
    return JSON.stringify(e)
  return e
}

const logger = {
  loggerWinston,
  info: (e: unknown) => {
    loggerWinston.info(toString(e))
  },
  error: (e: unknown) => {
    loggerWinston.error(toString(e))
  },
  warn: (e: unknown) => {
    loggerWinston.warn(toString(e))
  },
  debug: (e: unknown) => {
    loggerWinston.debug(toString(e))
  }
}

export default logger
