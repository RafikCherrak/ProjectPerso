
import { RepoException } from "../exceptions/RepoException";
import logger from "../services/logger";

export default abstract class BaseRepo {

    public handleError(error: unknown): void {
        const stringError = typeof error === 'object' ? JSON.stringify(error) : error as string
        const err = new Error()
        const stack = err.stack?.split('\n')
        stack?.shift() // shift twice to reach the line that trowed
        stack?.shift()
        logger.debug(`==========================================`)
        logger.error(`RepoException, inner type ${typeof error}`)
        logger.error(`${stringError}`)
        if (typeof (error as Error).toString === 'function')
            logger.error((error as Error).toString())
        // if (stack)
        //     logger.error(stack[0])
        stack?.map(s =>logger.error(s)) // FIXME after the first line the files/lines are all wrong
        logger.debug(`==========================================`)
        throw RepoException.from(error as Error)
    }
}