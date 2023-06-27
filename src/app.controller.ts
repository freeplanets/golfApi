import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import signin from './models/login/signinRequest';
import totalResponse from './models/login/signinResponse';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ExampleObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface signinRequest {
  username:string;
  password:string;
  reCAPTCHAToken:string;
}
interface signinResponse {
  errcode:string;
  error:any;
  data:any;
}
const loginExampleValue:signinRequest = {
  username: 'test',
  password: 'pass',
  reCAPTCHAToken: '1234',
}
const loginResponse:signinResponse = {
  errcode: '0',
  error: 'object',
  data: 'object',
}
const example:Record<'login', ExampleObject> = {
  login: {
    value: loginExampleValue
  }
}
const resExample:Record<'Response', ExampleObject> = {
  Response: {
    description: '回傳範例',
    value: loginResponse,
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('users')
  getAllUsers() {
    const users = [{ "Name": "Michael","Age":25 }];
    return users;
  }
  @Post('login')
  @ApiBody({description:'登入', schema:{ example:example }, examples: example,type: signin})
  @ApiResponse({status:200, description: 'A post has been successfully fetched', 
  type: totalResponse, schema: {example: resExample} })
  login(@Body() signin: signin) {
    console.log('login:', signin);
    const res:signinResponse = {
      errcode: 'string',
      error: 'object',
      data: 'object',
    }
    return res;
  }
}
