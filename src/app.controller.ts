import { Body, Controller, Get, Headers, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import signinReq from './models/signin/signinRequest';
import signinRes from './models/signin/signinResponse';
import { ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { signinReqEx, signinResRx } from './models/examples/loginEx';
import { forgetPassword, reToken, verify2fa } from './models/if';
import verify2faRequest from './models/signin/verify2faRequest';
import { verify2aEx, verify2aResEx } from './models/examples/verify2faEx';
import verify2faResponse from './models/signin/verify2faResponse';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import refreshTokenRequest from './models/signin/refreshTokenRequest';
import { refreshTokenEx } from './models/examples/refreshTokenEx';
import forgetPasswordRequest from './models/signin/forgetPasswordRequest';
import { forgetPasswordEx, forgetPasswordResEx } from './models/examples/forgetPasswordEx';
import forgetPasswordReponse from './models/signin/forgetPasswordResponse';

const jwt = new JwtService();
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

  @Post('signin')
  @ApiBody({description:'登入 / signin', type: signinReq, examples: signinReqEx})
  @ApiResponse({status:200, description: 'A post has been successfully fetched', 
  type: signinRes })
  async signin(@Body() signin: signinReq, @Res() res:Response) {
    console.log('login:', signin);
    const jwtstr = await jwt.signAsync(signin, {privateKey: 'test'});
    console.log('', jwtstr);
    res.setHeader('www-auth', jwtstr);
    res.end(); // or @Res({passthrough:true}) instead
    return signinResRx.Response.value;
  }

  @Post('verify2fa')
  @ApiHeader({name: 'www-auth'})
  @ApiBody({description:'2FA驗證 / verify 2fa code', type: verify2faRequest, examples: verify2aEx})
  @ApiResponse({status:200, description:'二步驟認證回傳物件',
    type: verify2faResponse})
  verify2fa(@Body() body:verify2fa, @Headers('www-auth') token:string) {
      console.log('login:', body); 
      console.log('login:', token);
      return verify2aResEx.Response.value;
  }

  @Post('refreshToken')
  @ApiHeader({name:'www-auth'})
  @ApiBody({description:'更新token / refresh token', type: refreshTokenRequest, examples: refreshTokenEx})
  @ApiResponse({status:200, description:'刷新token回傳物件', type: verify2faResponse})
  refreshToken(@Body() body:reToken, @Headers('www-auth') token:string){
    console.log('login:', body); 
    console.log('login:', token);
    return verify2aResEx.Response.value;
  }

  @Post('forgetPassword')
  @ApiHeader({name:'www-auth'})
  @ApiBody({description:'忘記密碼 / forget password api', type: forgetPasswordRequest, examples: forgetPasswordEx})
  @ApiResponse({status:200, description:'忘記密碼回傳物件', type: forgetPasswordReponse})
  forgetPassword(@Body() body:forgetPassword, @Headers('www-auth') token:string){
    console.log('login:', body); 
    console.log('login:', token);
    return forgetPasswordResEx.Response.value;    
  }
}
