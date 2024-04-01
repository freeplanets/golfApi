import { Schema } from "dynamoose";

const CompetitionFormatSchema =  new Schema({
    cfid: {
        type: String,
        hashKey: true,
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
    modifyid: {
        type: String,
        required: false,
    },
}, {timestamps: true, saveUnknown: false});
export default CompetitionFormatSchema;