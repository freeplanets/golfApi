import { Schema } from "dynamoose";

const MembersHcpSchema = new Schema({
    memberid: {
        type: String,
        hashKey: true,
    },
    siteid: {
        type: String,
        index: {
            name: 'siteidmemberNameGlobalIndex',
            type: 'global',
            rangeKey: 'memberName'
        }
    },
    memberName: {
        type: String,
    },
    lastHandicap: {
        type: Number,
    }
}, {timestamps: true, saveUnknown: false});
export default MembersHcpSchema;