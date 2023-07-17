import { Schema } from "dynamoose";
import mapLatLong from "../common/mapLatLong.schema";

const CarPositionHistorySchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	},
	carid: {
		type: String,
		index: true,
	},
	location: {
		type: mapLatLong,
	}
}, {timestamps: {createdAt: null}});
export default CarPositionHistorySchema;