import { Schema } from "dynamoose";

const HandicapHistorySchema = new Schema({
    hhid: {
        type: String,
        hashKey: true,
    },
    siteid: {
        type: String,
        index: [
            {
                name: 'siteidgameidGlobalIndex',
                type: 'global',
                rangeKey: 'gameid',
            },
            {
                name: 'siteidmemberidGlobalIndex',
                type: 'global',
                rangeKey: 'memberid',
            },
            {
                name: 'siteidmemberNameGlobalIndex',
                type: 'global',
                rangeKey: 'memberName',
            },
            {
                name: 'siteidcreatedAtGlobalIndex',
                type: 'global',
                rangeKey: 'createdAt',
            }
        ]
    },
    gameid: {
        type: String,
    },
    memberid: {
        type: String,
    },
    memberName: {
        type: String,
    },
    course: {
        type: String,
    },
    gross: {
        type: Number,
    },
    grossAfterAdjust: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    slope: {
        type: Number,
    },
    hcpDiff: {
        type: Number,
    },
    hcpAvg: {
        type: Number,
    },
    hcpIndex: {
        type: Number,
    },
    hcpField: {
        type: Number,
    },
    unCalcMark: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true,saveUnknown: false});
export default HandicapHistorySchema;