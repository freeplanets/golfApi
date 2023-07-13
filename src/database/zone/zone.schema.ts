import { Schema } from "dynamoose";

const ZoneSchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	},
	clubid: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	Par: {
		type: Number,
		default: 36,
	},
	modifyID: {
		type: String,
	}
}, {timestamps:true});
export default ZoneSchema;