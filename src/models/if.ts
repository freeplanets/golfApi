export interface signinReq {
  username:string;
  password:string;
  reCAPTCHAToken:string;
}
export interface signinRes {
  errcode:string;
  error:any;
  data:any;
}
export interface commonRes {
  errcode:string;
  error?:errObj;
}
export interface commonResWithData<D> extends commonRes {
  data?:D;
}
export interface errObj {
  message: string;
  extra?: {[key:string]:any};
}
export interface reToken {
  refreshToken: string; 
}
export interface rstToken {
  resetToken: string;
}
export interface tokenObj {
  token?: string;
  refreshToken?: string;
}
export interface signinResData {
  tokens?: tokenObj;
  twofaqrcode?:string;
  needfa?:boolean;
}
export interface verify2fa {
  twoFAcode: string;
}
export interface forgetPassword {
  username: string;
  mobile: string;
}
export interface resetPassword extends rstToken {
  smsCode:string;
  newPassword:string;
}
export interface updatePassword {
  oldPassword:string;
  newPassword:string;
  newPassword2:string;
}
export interface reset2FA {
  password:string;
}
export interface createManager extends updateManager {
  name:string;
  password:string;
}
export interface updateManager {
  nickname?:string;
  password?:string;
  title?:string;
  mobile?:string;
  enable2FA?:boolean;
}