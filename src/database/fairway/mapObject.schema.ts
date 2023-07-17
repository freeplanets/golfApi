import { Schema } from "dynamoose";
import mapLatLong from "../common/mapLatLong.schema";
import mapAsset from "./mapAsset.schema";

const mapObject = new Schema({
	src: {
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
		schema: [mapAsset],
	}, //球道上物件
});
export default mapObject;