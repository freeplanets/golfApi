import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import GameTitle from "./GameTitle.schema";
import GameTitleController from "../../controller/manage/game-title/game-title.controller";
import GameTitleService from "./GameTitle.service";

@Module({
    imports:[
        DynamooseModule.forFeature([
            {
                name: 'GameTitle',
                schema: GameTitle,
                options: {
                    throughput: 'ON_DEMAND',
                }
            }
        ]),
    ],
    controllers: [GameTitleController],
    providers:[GameTitleService],
})
export default class GameTitleModule {}