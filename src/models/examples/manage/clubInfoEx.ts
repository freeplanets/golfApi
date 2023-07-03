import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { clubInfo } from "src/models/if";

const clubInfoExVal:clubInfo = {
	ClubID:'TW01',
	ClubName: 'golf',
	NumberOfHoles: 27,
	ClubMembership: 'clubmembership',
  Address: '地址',
  City: '鄉鎮市',
  State: '城市/州(省)',
  Country: '國家',
  PostalCode: '12345',
  phone: '987654321',
  WebSite: 'www.xxx.net',
}

export const clubInfoEx:Record<'Request', ExampleObject> = {
	Request: {
		value: clubInfoExVal,
	}
}