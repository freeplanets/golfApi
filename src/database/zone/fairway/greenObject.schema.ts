import { Schema } from "dynamoose";
import mapAssetObject from "../common/mapAssetObject.schema";

const greenObject = new Schema({
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
	assets: {
		type: Array,
		schema: mapAssetObject,
		required: false,
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
	memo: {
		type: String,
	},	// 備註
});
export default greenObject;