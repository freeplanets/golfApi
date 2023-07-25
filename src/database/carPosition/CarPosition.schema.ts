import { Schema } from "dynamoose";
import mapLatLong from "../common/mapLatLong.schema";

const CarPositionSchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	},
	siteid: {
		type: String,
		index: true,
	},
	zoneid: {
		type: String,
		index: true,
	},
	fairwayno: {
		type: Number,
		index: true,
	},
	carid: {
		type: Number,
	},
	location: {
		type:Object,
		schema: mapLatLong,
	}
}, {timestamps: true});
export default CarPositionSchema;