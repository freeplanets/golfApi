import { Schema } from "dynamoose";

const HandicapHistory = new Schema({
    hhid: {
        type: String,
        hashKey: true,
    },
    siteid: {
        type: String,
        index: [
            {
                name: 'siteidmemberidGlobalIndex',
                type: 'global',
                rangeKey: 'memberid',
            },
            {
                name: 'siteidmemberNameGlobalIndex',
                type: 'global',
                rangeKey: 'memberName',
            }
        ]
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
    }
}, {timestamps: true,saveUnknown: false});
export default HandicapHistory;