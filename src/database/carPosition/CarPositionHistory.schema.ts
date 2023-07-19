import { Schema } from "dynamoose";
import mapLatLong from "../common/mapLatLong.schema";

const CarPositionHistorySchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	},
	clubid: {
		type: String,
		index: true,
	},
	carid: {
		type: Number,
		index: true,
	},
	location: {
		type: Object,
		schema: mapLatLong,
	}
}, {timestamps: {createdAt: 'ts'}});
export default CarPositionHistorySchema;