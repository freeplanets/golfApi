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
                name: 'siteidtitleidGlobalIndex',
                type: 'global',
                rangeKey: 'titleid',
            },
            {
                name: 'siteidgrossGlobalIndex',
                type: 'global',
                rangeKey: 'gross',
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
        index: {
            name: 'memberidcreatedAtGlobalIndex',
            type: 'global',
            rangeKey: 'createdAt',
        }
    },
    memberName: {
        type: String,
    },
    course: {
        type: String,
    },
    hole1: {
        type: Number,
    },
    hole2: {
        type: Number,
    },
    hole3: {
        type: Number,
    },
    hole4: {
        type: Number,
    },
    hole5: {
        type: Number,
    },
    hole6: {
        type: Number,
    },
    hole7: {
        type: Number,
    },
    hole8: {
        type: Number,
    },
    hole9: {
        type: Number,
    },
    hole10: {
        type: Number,
    },
    hole11: {
        type: Number,
    },
    hole12: {
        type: Number,
    },
    hole13: {
        type: Number,
    },
    hole14: {
        type: Number,
    },
    hole15: {
        type: Number,
    },
    hole16: {
        type: Number,
    },
    hole17: {
        type: Number,
    },
    hole18: {
        type: Number,
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