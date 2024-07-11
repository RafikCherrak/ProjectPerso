import { Router } from "express";
import PublicCtrl from "../../controllers/public/Public"
import logger from "../../services/logger";


class UserRoutes {
    router = Router()
    publicCtrl = new PublicCtrl()
    // passwordCtrl = new PasswordCtrl()
    // accouuntCtrl = new AccouuntCtrl()


    constructor(){
        this.intializeRoutes()
        .then()
        .catch(err => {
            logger.error(err)
        })
    }

    async intializeRoutes(): Promise<void> {
        this.router.post("/login", this.publicCtrl.login)
    }
}

export default new UserRoutes().router