import { ApiProperty } from "@nestjs/swagger";
import { clubInfo } from "../if";
import { IsNumber } from "class-validator";

export default class clubInfoRequest implements clubInfo {
	@ApiProperty({
		description: '球場代號',
	})
  ClubID:string;  //球場代號
	@ApiProperty({
		description: '球場名稱',
	})
  ClubName:string; //球場名稱
	@ApiProperty({
		description: '會員型態',
		required: false,
	})
  ClubMembership?:string; //會員型態
	@ApiProperty({
		description: '總洞數',
	})
	@IsNumber()
  NumberOfHoles:number; //總洞數
	@ApiProperty({
		description: '地址',
		required: false,
	})
  Address?:string; //地址
	@ApiProperty({
		description: '所在鄉鎮市',
		required: false,
	})
  City?:string; //所在鄉鎮市
	@ApiProperty({
		description: '所在城市/州(省)',
		required: false,
	})	
  State?:string; // 所在城市/州(省)
	@ApiProperty({
		description: '國家',
		required: false,
	})
  Country?:string; //	國家
	@ApiProperty({
		description: '郵遞區號',
		required: false,
	})
  PostalCode?:string // 郵遞區號
	@ApiProperty({
		description: '電話',
		required: false,
	})
  phone?:string; //	電話
	@ApiProperty({
		description: '首頁網址',
		required: false,
	})
  WebSite?:string; // 首頁網址
}