import { Schema } from "dynamoose";

const MembersHcp = new Schema({
    memberid: {
        type: String,
        hashKey: true,
    },
    siteid: {
        type: String,
        index: {
            type: 'global',
        }
    },
    name: {
        type: String,
        index: {
            type: 'global',
        }
    },
    lastHandicap: {
        type: Number,
    }
}, {timestamps: true, saveUnknown: false});
export default MembersHcp;