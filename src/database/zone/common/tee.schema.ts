import { Schema } from "dynamoose";

const teeObjectSchema = new Schema({
	teeName: {
		type: String,
	}, // T台名稱
	teeColor: {
		type: String,
	}, // T台顏色
	slope: {
		type:Number,
		required: false,
	},	// 斜度指數
	rating: {
		type: Number,
		required: false,
	}, // 難度指數
	distance: {
		type: Number,
		required: false,
	}, // 距果嶺距離
});
export default teeObjectSchema;