import { Schema } from "dynamoose";

const TitleRanking = new Schema({
    trid: {
        type:String,
        hashKey: true,
    },
    siteid: {
        type: String,
        index: {
            type: 'global',
        }
    },
    titleid: {
        type: String,
    },
    titleName: {
        type: String,
        index: {
            type: 'global',
        },
    },
    memberid: {
        type: String,
    },
    memberName: {
        type: String,
        index: {
            type: 'global',
        },
    },
    gross: {
        type: Number,
    },
    net: {
        type: Number,
    },
    grossRanking: {
        type: Number,
    },
    netRanking: {
        type: Number,
    },
    trophy: {
        type: String,
    }
}, {timestamps: true, saveUnknown: false});
export default TitleRanking;