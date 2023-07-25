import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { courses } from "src/database/db.interface";
import { commonResWithData } from "src/models/if";

const courseExVal:Partial<courses> = {
	// courseid: '',
	siteid: 'linkougolf',
	courseName: 'WestEast',
	outZone: '01',
	inZone: '02',
	holes: 18,
	par: 72,
}

const courseResExVal:commonResWithData<Partial<courses>> = {
	errcode: '0',
	error: {
		message: 'some message',
		extra: {}
	},
	data: courseExVal,
}

const queryCoursesRequest:Partial<courses> = {
	siteid: 'linkougolf',
	courseName: 'WestEst',
}

export const queryCoursesRequestEx:Record<'Request', ExampleObject> = {
	Request: {
		value: queryCoursesRequest,
	}
}

export const courseEx:Record<'Request', ExampleObject> = {
	Request: {
		value: courseExVal,
	}
}

export const courseResEx:Record<'Response', ExampleObject> = {
	Response: {
		value: courseResExVal,
	}
}