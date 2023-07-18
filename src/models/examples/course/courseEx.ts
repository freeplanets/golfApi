import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { courses } from "src/database/db.interface";

const courseExVal:courses = {
	id: '',
	clubid: 'linkougolf',
	name: 'WestEast',
	outZone: '01',
	inZone: '02',
	Holes: 18,
	Par: 72,
}

export const courseEx:Record<'Request', ExampleObject> = {
	Request: {
		value: courseExVal,
	}
}