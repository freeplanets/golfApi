import { Schema } from "dynamoose";
import AreaScore from "./areaScore.schema";

const PlayScore = new Schema({
    player_id: {
        type: String,
    },
    player_name: {
        type: String,
    },
    team_id: {
        type: String,
    },
    team: {
        type: String,
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String,
    },
    cart: {
        type: String,
    },
    caddie: {
        type: Array,
        schema: [String],
    },
    area_score: {
        type: Array,
        schema: [AreaScore],
    }
});
export default PlayScore;