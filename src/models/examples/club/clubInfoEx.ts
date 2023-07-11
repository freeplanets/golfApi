import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import Club from "../../../database/club/club.interface";
import { commonResWithData } from "src/models/if";

const clubInfoExVal:Club = {
	id:'TW01',
	name: '林口球場',
	numberOfHoles: 27,
	membership: 'clubmembership',
  address: '地址',
  city: '鄉鎮市',
  state: '城市/州(省)',
  country: '國家',
  postalCode: '12345',
  phone: '987654321',
  website: 'www.xxx.net',
}

const clubResExVal:commonResWithData<Club> = {
	errcode: '0',
	data: clubInfoExVal
}

export const clubInfoEx:Record<'Request', ExampleObject> = {
	Request: {
		value: clubInfoExVal,
	}
}

export const clubResponse:Record<'Response', ExampleObject> = {
	Response: {
		value: clubResExVal,
	}
}