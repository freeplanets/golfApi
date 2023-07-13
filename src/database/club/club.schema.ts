import { Schema } from "dynamoose";

const ClubSchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	},
	name: {
		type: String,
	},
	membership: {
		type: String,
		required: false,
	},
	numberOfHoles: {
		type: Number,
		required: false,
	},
	address: {
		type: String,
		required: false,
	},
	city: {
		type: String,
		required: false,
	},
	state: {
		type: String,
		required: false,
	},
	country: {
		type: String,
		required: false,
	},
	postalCode: {
		type: String,
		required: false,
	},
	phone: {
		type: String,
		required: false,
	},
	website: {
		type: String,
		required: false,
	}
});
export default ClubSchema;