import { Schema } from "dynamoose";
import mapLatLong from "../common/mapLatLong.schema";

const CarPositionSchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	},
	zoneid: {
		type: String,
		index: true,
	},
	farywairid: {
		type: Number,
		index: true,
	},
	carid: {
		type: String,
	},
	location: {
		type: mapLatLong,
	}
}, {timestamps: true});
export default CarPositionSchema;