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