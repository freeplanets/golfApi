import { Schema } from "dynamoose";
import mapObject from "../common/mapObject.schema";
import Green from "./greenObject.schema";

const fairwayObjectSchema = new Schema({
	no: {
		type: Number,
	}, // 球道代號																								
	par: {
		type:Number, 
	}, // 標準桿桿數																								
	handicap: {
		type:Number,
	}, // 差點																								
	fairwayMap: {
		type: Object,
		schema: mapObject,
	}, // 球道圖資訊																								
	greens: {
		type: Array,
		schema: [Green],
	}, // 果嶺資訊
	modifyID: {
		type: String,
	}
});
export default fairwayObjectSchema;