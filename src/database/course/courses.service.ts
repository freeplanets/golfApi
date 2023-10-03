import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { courses, courseKey } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";

@Injectable()
export default class CoursesService extends defaultService<courses, courseKey> {
	constructor(
		@InjectModel('Courses')
		coursesModel:Model<courses, courseKey>,
	){
		super(coursesModel);
	}
}