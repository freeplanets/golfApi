import { Schema } from "dynamoose";

const mapLatLongSchema = new Schema({
	longitude: {
		type: Number,
	}, //	經度																					
	latitude: {
		type: Number,
	}, // 緯度																						
});
export default mapLatLongSchema;