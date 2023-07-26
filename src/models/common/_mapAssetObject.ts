import { ApiProperty } from "@nestjs/swagger";
import { mapAssetObject } from "../../database/db.interface";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { mapAssetObjectType } from "../enum";

export default class _mapAssetObject implements mapAssetObject {
	@ApiProperty({
		description: '名稱',
	})
	@IsString()
	name: string;
	
	@ApiProperty({
		description: '物件類型',
		enum: mapAssetObjectType,
	})
	@IsString()
	type: mapAssetObjectType;
	

	@ApiProperty({
		description: 'x座標',
	})
	@IsNumber()
	x: number;
	@ApiProperty({
		description: 'y座標',
	})
	@IsNumber()
	y: number;
	@ApiProperty({
		description:'block寬',
		required: false,
	})
	@IsNumber()
	blockWidth?: number;
	@ApiProperty({
		description: 'block高',
		required: false,
	})
	@IsNumber()
	blockHeight?: number;
	@ApiProperty({
		description: 'block顏色',
		required: false,
	})
	@IsString()
	blockColor?: string;
	@ApiProperty({
		description: '顯示與否',
	})
	@IsBoolean()
	show: boolean;
	@ApiProperty({
		description: '圖片',
	})
	@IsString()
	image: string;

	@ApiProperty({
		description: '標籤文字i18n key',
		required: false,
	})
	@IsString()
	labelText?: string;

	@ApiProperty({
		description: 'label字體(含大小)',
		required: false,
	})
	@IsString()
	labelFont?: string;

	@ApiProperty({
		description: 'label圖示',
		required: false,
	})
	@IsString()
	labelIcon?: string;

	@ApiProperty({
		description: 'label顏色',
		required: false,
	})
	@IsString()
	labelColor?: string;

	@ApiProperty({
		description: 'circle起始半徑',
		required: false,
	})
	@IsNumber()
	circleRadius?: number;

	@ApiProperty({
		description: 'circle顏色',
		required: false,
	})
	@IsString()
	circleColor?: string;

	@ApiProperty({
		description: 'circle 虛線',
		required: false,
	})
	@IsBoolean()
	circleDashline?: boolean;

	@ApiProperty({
		description: 'circle間距',
		required: false,
	})
	@IsNumber()
	circleGap?: number;

	@ApiProperty({
		description: 'circle最多幾個',
		required: false,
	})
	@IsNumber()
	circleMax?: number;
}