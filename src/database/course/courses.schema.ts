import { Schema } from "dynamoose";

const CoursesSchema = new Schema({
  courseid: {
    type: String,
    hashKey: true
  },
  siteid: {
    type: String,
    index: {
			type: 'global',
      // global: true
    }
  },
  courseName: {
    type: String
  },
  outZone: {
    type: String
  },
  inZone: {
    type: String
  },
  holes: {
    type: Number
  },
  par: {
    type: Number
  },
  slope: {
    type: Number,
		default: 0,
  },
  rating: {
    type: Number,
		default: 0,
  },
  courseType: {
    type: String
  },
  courseArchitect: {
    type: String,
		required: false,
  },
  openDate: {
    type: String,
		required: false,
  }
},{timestamps: true, saveUnknown: false});
export default CoursesSchema;