import { Schema } from "dynamoose";
import { mapObjectType } from "../../models/enum"; 

const mapAsset = new Schema({
	name: {
		type: String,
	}, // 名稱
	type: {
		type: String,
		enum: Object.keys(mapObjectType).map((val) => mapObjectType[val]),
	}, // 物件類型
	x: {
		type: Number,
	}, // x座標
	y: {
		type: Number,
	}, // y座標
	blockWidth: {
		type: Number,
		required: false,
	}, // block寬
	blockHeight: {
		type: Number,
		required: false,
	}, // block高
	blockColor: {
		type: String,
		required: false,
	}, // block顏色
	show: {
		type: Boolean,
	}, // 顯示與否
	image: {
		type: String,
	}, //圖片
	labelText: {
		type: String,
		required: false,
	}, // 標籤文字i18n key
	labelFont: {
		type: String,
	}, // label字體(含大小)
	labelIcon: { 
		type:String,
		required: false,
	},			// label圖示	FALSE																				
	labelColor:	{
		type: String,
		required: false,
	},		//	label顏色	FALSE																				
	circleRadius: {
		type: Number,
		required: false,
	}, // circle起始半徑	FALSE																				
	circleColor: {
		type: String,
		required: false,
	}, // circle顏色	FALSE																				
	circleDashline: { 
		type: Boolean,
		required: false,
	}, // circle 虛線	FALSE																				
	circleGap: {
		type: Number,
		required: false,
	}, //circle間距	FALSE																				
	circleMax: {
		type: Number,
		required: false,
	}, // circle最多幾個	FALSE																					
});
export default mapAsset;