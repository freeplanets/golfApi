import { Controller, Post, Headers } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";

@ApiTags('Manage')
@Controller('manage')
export class ManageController {
	constructor(){}
	@Post('updateProfile')
	@ApiHeader({name: 'www-auth'})
	updateProfile(@Headers('www-auth') token:string){}
}