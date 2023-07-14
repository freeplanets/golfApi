import { Schema } from "dynamoose";

const ZoneSchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	},
	zoneid: {
		type: String,
		required: true,
		index: true,
	},
	clubid: {
		type: String,
		required: true,
		index:true,
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