import { Schema } from "dynamoose";

const MembersHcpSchema = new Schema({
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
    memberName: {
        type: String,
        index: {
            type: 'global',
        }
    },
    lastHandicap: {
        type: Number,
    }
}, {timestamps: true, saveUnknown: false});
export default MembersHcpSchema;