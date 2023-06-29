import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { commonResWithData, reToken, tokenObj } from "../if";

const refreshTokenExVal:reToken = {
	refreshToken: 'xxxxxxxxxxxxxx',
}
const refreshTokenResExVal:commonResWithData<tokenObj> = {
	errcode: '0',
	error: {
		message: 'message',
		extra: {}
	},
	data: {
		token: 'bbbbbbbbb',
		refreshToken: 'abcd',
	}
}
export const refreshTokenEx:Record<'Request', ExampleObject> = {
	Request: {
		value: refreshTokenExVal,
	}
}
export const refreshTokenResEx:Record<'Response', ExampleObject> = {
	Response: {
		value: refreshTokenResExVal,
	}
}