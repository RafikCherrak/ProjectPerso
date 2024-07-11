import bcrypt from "bcrypt"
import { type User } from "../../models"
import userRepo from "../../repositories/User"
import logger from "../../services/logger"
import { CoreException } from "../../exceptions/CoreException"

export async function login(email: string, password: string): Promise<User> {
    try {
        const user = await userRepo.findByEmail(email)
        logger.debug(user)
        if(user){
            if(user.password && password === user.password){
                logger.info("log in succes")
                return user
            }else{
                logger.error(`password inccorect`)
                    throw 'mot de passe incorrecte'
            }
        }else {
            throw 'user not found'
        }
    } catch (error) {
        logger.error(`user ${email} login ${JSON.stringify(error)}`)
        logger.error(error)
        throw new CoreException()
    }
}

// export async function findValidUser(email: string): Promise<User> {
//     try {
//         const user = await userRepo.findByEmail(email)
//         return user
//     } catch (error) {
//         logger.error(`user ${email} login error ${error}`)
//         throw new CoreException()
//     }
// }

// export const resetPassword = async (email: string): Promise<void> => {
//     try {
//         await userRepo.findByEmail(email)
//         // Add any additional password reset logic here if needed
//     } catch (err) {
//         throw new Error("Error reset password")
//     }
// }
