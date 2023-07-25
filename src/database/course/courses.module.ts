import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import CoursesSchema from "./courses.schema";
import CoursesService from "./courses.service";
import CourseController from "../../controller/manage/CourseController";

@Module({
	imports:[
		DynamooseModule.forFeature([{
			name: 'Courses',
			schema: CoursesSchema,
			options: {
				throughput: 'ON_DEMAND',
			}
		}])
	],
	controllers: [CourseController],
	providers: [CoursesService],
	exports: [CoursesService],
})
export default class CouresModule {}