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
    notCountingHoles: {
        type: Number,
    },
    hcpRate: {
        type: Number,
    },
    is579: {
        type: Boolean,
    },
    modifyid: {
        type: String,
        required: false,
    },
}, {timestamps: true, saveUnknown: false});
export default CompetitionFormatSchema;