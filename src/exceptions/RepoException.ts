import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import logger from "../services/logger"

// Prisma error codes reference: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes

export class RepoException extends Error {
  errorCode: string
  description: string
  statusCode: number
  inner?: Error

  constructor(error: Error | RepoException | PrismaClientKnownRequestError) {
    super(error.toString())
    this.description = error.toString()
    this.errorCode = error instanceof RepoException ? error.errorCode : "0000"
    this.statusCode = 500
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(error)

    if ((error as PrismaClientKnownRequestError).code !== undefined) {
      switch ((error as PrismaClientKnownRequestError).code) {
        case "P2025": // An operation failed because it depends on one or more records that were required but not found.
          switch (error.toString()) {
            case "NotFoundError: No User found":
              this.errorCode = "USER_NOT_FOUND"
              break
            case "NotFoundError: No Account found":
              this.errorCode = "ACCOUNT_NOT_FOUND"
              break
            case "NotFoundError: No Campaign found":
              this.errorCode = "CAMPAIGN_NOT_FOUND"
              break
            case "NotFoundError: No AccountMembership found":
              this.errorCode = "ACCOUNTMEMBERSHIP_NOT_FOUND"
              break
            default:
              logger.debug(`default code ${(error as PrismaClientKnownRequestError).code}`)
              break
          }
          break
        default:
          logger.debug(`default code ${(error as PrismaClientKnownRequestError).code}`)
      }
    }
  }

  public static from(obj: Error | RepoException): RepoException {
    return new RepoException(obj)
  }
}
