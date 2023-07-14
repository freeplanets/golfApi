import { Schema } from "dynamoose";

const Green = new Schema({
	sno: {
		type: String,
	}, // 果嶺代號
	topEdge:{
		type: Number,
	}, // 距上邊界距離
	leftEdge:{
		type: Number,
	}, // 距左邊界距離
	rightEdge:{
		type: Number,
	}, // 距右邊界距離
	bottomEdge: {
		type: Number,
	}, // 距下邊界距離
});
export default Green;