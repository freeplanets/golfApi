import { ApiProperty } from "@nestjs/swagger";
import { OperatorSign, filterObj, oneOfType } from "../../function/func.interface";
import _oneOfType from "./_oneOfType";

export default class _filterObj implements filterObj {
	@ApiProperty({
		description: 'filter/field name',
	})
	key: string;

	@ApiProperty({
		description: 'operator',
		enum: OperatorSign,
	})
	op: OperatorSign;

	@ApiProperty({
		description: 'values',
		isArray: true,
		type: _oneOfType,
	})
	values: oneOfType[];
}