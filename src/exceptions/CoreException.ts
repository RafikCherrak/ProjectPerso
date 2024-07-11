// import logger from "../services/logger"
// import { RepoException } from "./RepoException"
// import messagesCode from "./messagesCode"
// import { accountErrorCode } from "./messagesCode/accountErrorCode"
// import { campaignErrorCode } from "./messagesCode/campaignErrorCode"
// import { ObjectError } from "./messagesCode/generateObjectError"
// import { genericErrorCode } from "./messagesCode/genericErrorCode"
// import { userErrorCode } from "./messagesCode/userErrorCode"
// export class CoreException extends Error {
//   statusCode: number
//   errorCode: string
//   description: string
//   inner?: Error

//   constructor(err: string | Error | RepoException) {
//     let error: ObjectError

//     if (err instanceof RepoException) {
//       switch (err.description) {
//         case "NotFoundError: No User found":
//           error = messagesCode[userErrorCode.USER_NOT_FOUND] as ObjectError
//           break
//         case "NotFoundError: No Account found":
//           error = messagesCode[accountErrorCode.ACCOUNT_NOT_FOUND] as ObjectError
//           break
//         case "NotFoundError: No Campaign found":
//           error = messagesCode[campaignErrorCode.CAMPAIGN_NOT_FOUND] as ObjectError
//           break
//         case "NotFoundError: No AccountMembership found":
//           error = messagesCode[campaignErrorCode.CAMPAIGN_NOT_FOUND] as ObjectError
//           break
//         default:
//           error = messagesCode[genericErrorCode.INTERNAL_ERROR] as ObjectError
//       }
//     } else {
//       error = messagesCode[err.toString()] as ObjectError
//     }

//     if (typeof error === "string") {
//       logger.debug(`string`)
//       logger.debug(error)
//     }

//     super(error?.description ?? error)
//     this.description = error?.description ?? "Internal server error"
//     this.statusCode = error?.statusCode ?? 500
//     this.errorCode = error?.errorCode ?? "INTERNAL_ERROR"
//     //Object.setPrototypeOf(this, new.target.prototype)
//     //Error.captureStackTrace(this)
//   }

//   public toString = (): string => {
//     return `[${this.errorCode}] ${this.stack}`
//   }

//   public static from(obj: CoreException | RepoException | string): CoreException {
//     //logger.warn(`CoreException from ${typeof obj}: ${obj}`)
//     return new CoreException(obj)
//   }
// }


export class CoreException{

}