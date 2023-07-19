import { Schema } from "dynamoose";

const TeeSchema = new Schema({
	name: {
		type: String,
	},
	distance: {
		type: Number,
		required: false,
	},
});
export default TeeSchema;