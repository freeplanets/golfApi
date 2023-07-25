import { Schema } from "dynamoose";
import mapLatLong from "../common/mapLatLong.schema";

const CarPositionHistorySchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	},
	siteid: {
		type: String,
		index: true,
	},
	carid: {
		type: Number,
		index: true,
	},
	status: {
		type: String,
		default: '',
	},
	location: {
		type: Object,
		schema: mapLatLong,
		required: false,
	}
}, {timestamps: {createdAt: 'ts'}});
export default CarPositionHistorySchema;