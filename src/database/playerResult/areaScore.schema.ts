import { Schema } from "dynamoose";

const AreaScore = new Schema({
    area: {
        type: String,
    },
    score1: {
        type: Number,
    },
    score2: {
        type: Number,
    },
    score3: {
        type: Number,
    },
    score4: {
        type: Number,
    },
    score5: {
        type: Number,
    },
    score6: {
        type: Number,
    },
    score7: {
        type: Number,
    },
    score8: {
        type: Number,
    },
    score9: {
        type: Number,
    },
    total: {
        type: Number,
    },
});
export default AreaScore;
