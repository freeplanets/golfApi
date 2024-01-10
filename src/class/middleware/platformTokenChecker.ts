import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { commonRes } from "../../models/if";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";
import { tokenCheck } from "../../function/Commands";

@Injectable()
export class PlatformTokenChecker implements NestMiddleware {
    use(req: Request, res:Response, next:NextFunction) {
        const resp: commonRes = {
            errcode: ErrCode.TOKEN_ERROR,
            error: {
                message: errorMsg('TOKEN_ERROR'),
            }
        }
        const token = req.header('WWW-AUTH');
        if (token) {
            const user = tokenCheck(token);
            if (user) {
                res.locals.user = user;
                next();
                return;
            }
        }
        res.send(JSON.stringify(resp));
    }
}