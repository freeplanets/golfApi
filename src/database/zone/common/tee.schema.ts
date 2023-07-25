import { Schema } from "dynamoose";

const teeObjectSchema = new Schema({
	teeName: {
		type: String,
	}, // T台名稱
	teeColor: {
		type: String,
	}, // T台顏色
	distance: {
		type: Number,
		required: false,
	}, // 距果嶺距離
});
export default teeObjectSchema;