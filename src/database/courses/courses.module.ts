import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import CoursesSchema from "./courses.schema";
import CoursesService from "./courses.service";
import CoursesController from "../../controller/manage/CoursesController";

@Module({
	imports:[
		DynamooseModule.forFeature([{
			name: 'Courses',
			schema: CoursesSchema,
		}])
	],
	controllers: [CoursesController],
	providers: [CoursesService],
	exports: [CoursesService],
})
export default class CouresModule {}