// PublicCtrl.ts

import { Request, Response, NextFunction } from "express";
import { CtrlResponse, EmptyResponse } from "../BaseController";
import LoginRequestDTO from "../DTO/LoginRequestDTO";
import { User } from "../../models";
import { login } from "../../core/auth/auth";
import { HttpException } from "../../exceptions/HttpException";
import logger from "../../services/logger";

export default class PublicCtrl {
    async login(req: Request, res: Response, next: NextFunction): Promise<CtrlResponse<EmptyResponse>> {
        try {
            const request = LoginRequestDTO.from(req.body);
            const user: User = await login(request.email, request.password);

            if (user){
                return res.json({type: "succes",status:200,message:"log in succes "});
            } else {
                return res.json({type : "error",status: 401, message : "invalid credentials"})
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<CtrlResponse<EmptyResponse>> {
        try {
            if (req.session != null) {
                req.session.destroy(() => {
                    logger.debug("Session destroyed");
                });
            }
            res.json({});
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}
