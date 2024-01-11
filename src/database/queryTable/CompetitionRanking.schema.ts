import { Schema } from "dynamoose";

const CompetitionRankingSchema = new Schema({
    trid: {
        type:String,
        hashKey: true,
    },
    siteid: {
        type: String,
        index:[
            {
                name: 'siteidtitleNameGlobalIndex',
                type: 'global',
                rangeKey: 'titleName',
            },
            {
                name: 'siteidtrophyGlobalIndex',
                type: 'global',
                rangeKey: 'trophy',
            }
        ],
    },
    titleid: {
        type: String,
    },
    titleName: {
        type: String,
    },
    memberid: {
        type: String,
    },
    memberName: {
        type: String,
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
        type: Boolean,
    }
}, {timestamps: true, saveUnknown: false});
export default CompetitionRankingSchema;