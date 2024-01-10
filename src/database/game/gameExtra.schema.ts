import { Schema } from "dynamoose";

const GameExtra = new Schema({
    team: {
        type: String,
    },
    team_id:{
        type: String,
    },
    group_no:{
        type: String,
    }
});
export default GameExtra