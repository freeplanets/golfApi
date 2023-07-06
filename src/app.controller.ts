import { Body, Controller, Get, Headers, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { AppService } from './app.service';
import signinReq from './models/signin/signinRequest';
import signinRes from './models/signin/signinResponse';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { signinReqEx, signinResRx } from './models/examples/signin/loginEx';
import { forgetPassword, reToken, reset2FA, resetPassword, updatePassword, verify2fa } from './models/if';
import verify2faRequest from './models/signin/verify2faRequest';
import { verify2aEx } from './models/examples/signin/verify2faEx';
import commonResponse from './models/common/commonResponse';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import refreshTokenRequest from './models/signin/refreshTokenRequest';
import { refreshTokenEx, refreshTokenResEx } from './models/examples/signin/refreshTokenEx';
import forgetPasswordRequest from './models/signin/forgetPasswordRequest';
import { forgetPasswordEx, forgetPasswordResEx } from './models/examples/signin/forgetPasswordEx';
import forgetPasswordReponse from './models/signin/forgetPasswordResponse';
import refreshTokenResponse from './models/signin/refreshTokenResponse';
import { commonResEx } from './models/examples/commonResponseEx';
import resetPasswordRequest from './models/signin/resetPasswordRequest';
import { resetPasswordEx } from './models/examples/signin/resetPasswordEx';
import updatePasswordRequest from './models/signin/updatePasswordRequest';
import { updatePasswordEx } from './models/examples/signin/updatePasswordEx';
import reset2FARquest from './models/signin/reset2FARequest';
import { reset2FAEx } from './models/examples/signin/reset2FAEx';

const jwt = new JwtService();

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('signin')
  @ApiBody({description:'登入 / signin', type: signinReq, examples: signinReqEx})
  @ApiResponse({status:200, description: 'A post has been successfully fetched', 
  type: signinRes })
  async signin(@Body() signin: signinReq, @Res({passthrough:true}) res:Response) {
    console.log('login:', signin);
    const jwtstr = await jwt.signAsync(signin, {privateKey: 'test'});
    console.log('', jwtstr);
    res.setHeader('www-auth', jwtstr);
    res.status(200).json(signinResRx.Response.value);
    // res.end(); // or @Res({passthrough:true}) instead
    //return signinResRx.Response.value;
  }

  @Post('verify2fa')
  @ApiBody({description:'2FA驗證 / verify 2fa code', type: verify2faRequest, examples: verify2aEx})
  @ApiResponse({status:200, description:'二步驟認證回傳物件',
    type: commonResponse})
  verify2fa(@Body() body:verify2fa) {
      const token = Headers('www-auth');
      console.log('verify2fa:', body); 
      console.log('Token:', token);
      return commonResEx.Response.value;
  }

  @Post('refreshToken')
  @ApiBody({description:'更新token / refresh token', type: refreshTokenRequest, examples: refreshTokenEx})
  @ApiResponse({status:200, description:'刷新token回傳物件', type: refreshTokenResponse})
  refreshToken(@Body() body:reToken){
    const token = Headers('www-auth');
    console.log('refreshToken:', body); 
    console.log('Token:', token);
    return refreshTokenResEx.Response.value;
  }

  @Post('forgetPassword')
  @ApiBody({description:'忘記密碼 / forget password api', type: forgetPasswordRequest, examples: forgetPasswordEx})
  @ApiResponse({status:200, description:'忘記密碼回傳物件', type: forgetPasswordReponse})
  forgetPassword(@Body() body:forgetPassword){
    console.log('forgetPassword:', body); 
    return forgetPasswordResEx.Response.value;    
  }

  @Patch('forgetPassword')
  @ApiBody({description:'重置密碼 / reset password api', type: resetPasswordRequest, examples: resetPasswordEx})
  @ApiResponse({status:200, description: '重置密碼回傳物件', type: commonResponse})
  resetPassword(@Body() body:resetPassword){
    console.log('resetPassword', body);
    return commonResEx.Response.value;
  }

  @Post('password')
  @ApiBody({description:'更改密碼 / change password', type: updatePasswordRequest, examples: updatePasswordEx})
  @ApiResponse({status:200, description:'更新密碼回傳物件',type:commonResponse})
  updatePassword(@Body() body:updatePassword){
    const token = Headers('www-auth');
    console.log('password:', body); 
    console.log('Token:', token);
    return commonResEx.Response.value;
  }

  @Put('2fa')
  @ApiBody({description:'重置2FA / reset 2FA', type:reset2FARquest, examples: reset2FAEx})
  @ApiResponse({status:200, description:'重置 2FA 回傳物件', type:commonResponse})
  reset2FA(@Body() body:reset2FA){
    const token = Headers('www-auth');
    console.log('2fa:', body); 
    console.log('Token:', token);
    return commonResEx.Response.value;
  }

  @Put('2fa/:username')
  @ApiBody({description:'重置2FA / reset 2FA', type:reset2FARquest, examples: reset2FAEx})
  @ApiResponse({status:200, description:'重置 2FA 回傳物件', type:commonResponse})
  resetUser2FA(@Body() body:reset2FA, @Param('username') username:string){
    const token = Headers('www-auth');
    console.log('2fa/username:', body, username); 
    console.log('Token:', token);
    return commonResEx.Response.value;
  }

  @Get('logout')
  @ApiResponse({status:200, description:'登出回傳物件', type:commonResponse})
  logout(){
    const token = Headers('www-auth');
    console.log('Token:', token);
    return commonResEx.Response.value;    
  }
}