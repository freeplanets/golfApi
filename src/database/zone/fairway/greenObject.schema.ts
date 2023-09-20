import { Schema } from "dynamoose";
import mapAssetObjectSchema from "../common/mapAssetObject.schema";


const greenObjectSchema = new Schema({
	sno: {
		type: String,
	}, // 果嶺代號
	topEdge:{
		type: Number,
		required: false,
	}, // 距上邊界距離
	leftEdge:{
		type: Number,
		required: false,
	}, // 距左邊界距離
	rightEdge:{
		type: Number,
		required: false,
	}, // 距右邊界距離
	bottomEdge: {
		type: Number,
	}, // 距下邊界距離
	image: {
		type:String,
	},
	width: {
		type: Number,
		required: false,
	}, // 圖片寬度
	height: {
		type: Number,
		required: false,
	}, // 圖片高度
	widthDistance: {
		type: Number,
		required: false,
	}, // 寬度的距離長度(米)
	assets: {
		type: Array,
		schema: [mapAssetObjectSchema],
		required: false,
	},	
	enable: {
		type: Boolean,
		required: false,
	},
	speed: {
		type: Number,
		required: false,
	},
	memo: {
		type: String,
	},	// 備註
	greenHeight: {
		type: Number,
	},
	greenWidth: {
		type: Number,
	},
});
export default greenObjectSchema;