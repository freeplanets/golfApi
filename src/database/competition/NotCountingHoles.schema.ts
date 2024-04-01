import { Schema } from "dynamoose";

const NotCountingHoles = new Schema({
    zoneid: {
        type: String,
    },
    fairways: {
        type: Array,
        schema: [Number],
    },
    pars: {
        type: Array,
        schema: [Number],
    }   
});
export default NotCountingHoles;