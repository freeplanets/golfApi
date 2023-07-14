import { Schema } from "dynamoose";
import mapObject from "./mapObject.schema";
import Green from "./green.schema";

const FairwaySchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	}, // 
	clubid: {
		type: String,
		index: true,
	}, // 球場/俱樂部代號																								
	zoneid: {
		type:String,
		index: true,
	}, // 區域代號																								
	fairwayid: {
		type: Number,
		index: true,
	}, // 球道代號																								
	yellowTee: {
		type: Number,
		required: false,
	}, // 金發球台距果嶺距離																								
	blackTee: {
		type: Number,
		required: false,
	}, // 黑發球台距果嶺距離																								
	blueTee:{
		type: Number,
		required: false,
	}, // 藍發球台距果嶺距離																								
	whiteTee: {
		type: Number,
		required: false,
	}, // 白發球台距果嶺距離																								
	redTee: {
		type: Number,
		required: false,
	}, // 紅發球台距果嶺距離																								
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
export default FairwaySchema;