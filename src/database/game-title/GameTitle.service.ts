import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { gameTitle, titleKey } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";

@Injectable()
export default class GameTitleService extends defaultService<gameTitle, titleKey> {
    constructor(
        @InjectModel('GameTitle')
        gameTitleModel:Model<gameTitle, titleKey>

    ){
        super(gameTitleModel);
    }
}