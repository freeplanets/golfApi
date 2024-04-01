import { Schema } from "dynamoose";
import NotCountingHoles from "./NotCountingHoles.schema";

const CompetitionSchema = new Schema({
    titleid: {
        type: String,
        hashKey: true,
    },
    titleName: {
        type: String,
        index: {
            type: 'global',
        }
    },
    siteid: {
        type: String,
        index: {
            type: 'global',
        }
    },
    gameStart: {
        type: String,
        index: {
            type: 'global',
        }
    },
    gameEnd: {
        type: String,
        index: {
            type: 'global',
        }
    },
    cfName: {
        type: String,
        index: {
            type: 'global',
        }
    },
    cfType: {
        type: String,
    },
    notCountingHoles: {
        type: Array,
        schema: [NotCountingHoles],
    },
    grossCounter: {
        type: Number,
    },
    netCounter: {
        type: Number,
    },
    competitionLocation: {
        type: String,
        index: {
            type: 'global',
        }
    },
    modifyid: {
        type: String,
        required: false,
    },
}, {timestamps: true, saveUnknown: false});
export default CompetitionSchema;