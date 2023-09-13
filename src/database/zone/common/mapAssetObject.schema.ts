import { Schema } from "dynamoose";
import { mapAssetObjectType } from "../../../models/enum"; 

const mapAssetObjectSchema = new Schema({
	name: {
		type: String,
	}, // 名稱
	type: {
		type: String,
		enum: Object.keys(mapAssetObjectType).map((val) => mapAssetObjectType[val]),
	}, // 物件類型
	show: {
		type:Boolean,
	}, // 顯示與否
	x: {
		type: Number,
	}, // x座標
	y: {
		type: Number,
	}, // y座標
	width: {
		type: Number,
		required: false,
	}, // block寬
	height: {
		type: Number,
		required: false,
	}, // block高
	icon: {
		type: String,
		required: false,
	}, // label圖示
	color: {
		type: String,
		required: false,
	}, // block顏色
	bgColor: {
		type: String,
		required: false,
	}, // 底色
	borderColor: {
		type: String,
		required: false,
	},
	font: {
		type: String,
		required: false,
	}, // label字體(含大小)
	image: {
		type: String,
	}, //圖片
	label: {
		type: String,
		required: false,
	}, // 標籤文字i18n key
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
	startAngle: {
		type: Number,
		required: false,
	}, // circle起始角度
	stopAngle: {
		type: Number,
		required: false,
	}, // circle結束角度
	textAngle: {
		type: Number,
		required: false,
	}, // circle弧上標籤角度
	rotate: {
		type: Number,
		required: false,
	}, // 標籤/圖片/方塊旋轉角度
});
export default mapAssetObjectSchema;