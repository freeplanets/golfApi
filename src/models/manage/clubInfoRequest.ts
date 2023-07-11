import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import Club from "src/database/club/club.interface";

export default class clubInfoRequest implements Club {
	@ApiProperty({
		description: '球場代號',
	})
  id:string;  //球場代號
	@ApiProperty({
		description: '球場名稱',
	})
  name:string; //球場名稱
	@ApiProperty({
		description: '會員型態',
		required: false,
	})
  membership?:string; //會員型態
	@ApiProperty({
		description: '總洞數',
	})
	@IsNumber()
  numberOfHoles:number; //總洞數
	@ApiProperty({
		description: '地址',
		required: false,
	})
  address?:string; //地址
	@ApiProperty({
		description: '所在鄉鎮市',
		required: false,
	})
  city?:string; //所在鄉鎮市
	@ApiProperty({
		description: '所在城市/州(省)',
		required: false,
	})	
  State?:string; // 所在城市/州(省)
	@ApiProperty({
		description: '國家',
		required: false,
	})
  country?:string; //	國家
	@ApiProperty({
		description: '郵遞區號',
		required: false,
	})
  postalCode?:string // 郵遞區號
	@ApiProperty({
		description: '電話',
		required: false,
	})
  phone?:string; //	電話
	@ApiProperty({
		description: '首頁網址',
		required: false,
	})
  website?:string; // 首頁網址
}