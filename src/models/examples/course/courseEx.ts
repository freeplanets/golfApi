import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { courses, teeObject } from "../../../database/db.interface";
import { commonResWithData } from "../../../models/if";

const rs1:teeObject = {
	teeName: 'Regular',
	teeColor: 'White',
	rating: 71.5,
	slope: 134,
}
const rs2: teeObject = {
	teeName:'Champion',
	teeColor: 'Blue',
	rating: 73.5,
	slope: 138,	
}
const rs3: teeObject = {
	teeName: 'Ladies',
	teeColor: 'Red',
	rating: 73.5,
	slope: 133,	
}
const courseExVal:Partial<courses> = {
	// courseid: '',
	siteid: 'linkougolf',
	courseName: 'WestEast',
	outZone: '01',
	inZone: '02',
	holes: 18,
	par: 72,
	tees: [rs1, rs2, rs3],
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