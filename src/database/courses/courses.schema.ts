import { Schema } from "dynamoose";

const CoursesSchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	},
	clubid: {
		type: String,
		index: true,
	},
	name: {
		type: String,
	},
	outZone: {
		type: String,
	},
	inZone: {
		type: String,
	},
	Holes: {
		type: Number,
	},
	Par: {
		type: Number,
	},
  Type: {
		type:String,
		required: false,
	},
  Architect: {
		type:String,
		required: false,
	},
  OpenDate:{
		type:String,
		required: false,
	}
},{timestamps: true});
export default CoursesSchema;