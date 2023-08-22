import { ApiProperty } from "@nestjs/swagger";
import { filterObj, oneOfType, queryReq } from "../../function/func.interface";
import _oneOfType from "./_oneOfType";
import _filterObj from "./_filterObj";

export default class queryRequest implements queryReq {
	@ApiProperty({
		description:'查詢欄位 / key used to query',
	})
	queryKey: string;

	@ApiProperty({
		description:'查詢型態 (range, individual) / query type (range, individual)',
	})
	queryType: string;

	@ApiProperty({
		description: '查詢資料 / key values or range to query',
		isArray: true,
		type: _oneOfType,
		required: false,
	})
	items?: oneOfType[];

	@ApiProperty({
		description:'過濾條件(and)',
		isArray: true,
		type: _filterObj,
		required: false,
	})
	filters?: filterObj[];

	@ApiProperty({
		description: '過濾條件(or)',
		isArray: true,
		type: _filterObj,
		required: false,	
	})
	anyFilters?: filterObj[];
}