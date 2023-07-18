import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { courses, defaultKey } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";

@Injectable()
export default class CoursesService extends defaultService<courses, defaultKey> {
	constructor(
		@InjectModel('Courses')
		private coursesModel:Model<courses, defaultKey>,
	){
		super(coursesModel);
	}
}