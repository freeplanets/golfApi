import { Schema } from "dynamoose";
import mapLatLong from "../../common/mapLatLong.schema";
import mapAssetObject from "./mapAssetObject.schema";

const mapObjectSchema = new Schema({
	image: {
		type: String,
	}, //檔案位置
	memo: {
		type: String,
	}, //備註
	topLeft: {
		type: Object,
		schema: mapLatLong,
	}, // 左上
	topRight: {
		type: Object,
		schema: mapLatLong,
	}	, // 右上
	bottomLeft: {
		type: Object,
		schema: mapLatLong,
	}, // 左下
	bottomRight: {
		type: Object,
		schema: mapLatLong,
	}, //右下
	assets:{
		type: Array,
		schema: [mapAssetObject],
	}, //球道上物件
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
	heading: {
		type: Number,
		required: false,
	}, // 方向
});
export default mapObjectSchema;