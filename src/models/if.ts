import { UserType } from "./enum";

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
export interface timeSection {
  start:string;
  end:string;
}
export interface createManager extends updateManager {
  ClubID:string;
  password:string;
  userType: UserType;
}
export interface updateManager {
  account:string;
  nickname?:string;
  password?:string;
  title?:string;
  userType?:UserType;
  workSection?:timeSection;
  mobile?:string;
  enable2FA?:boolean;
}
export interface clubInfo {
  ClubID:string;  //球場代號
  ClubName:string; //球場名稱
  ClubMembership?:string; //會員型態
  NumberOfHoles:number; //總洞數
  Address?:string; //地址
  City?:string; //所在鄉鎮市
  State?:string; // 所在城市/州(省)
  Country?:string; //	國家
  PostalCode?:string // 郵遞區號
  phone?:string; //	電話
  WebSite?:string; // 首頁網址
}
export interface zoneInfo {
  ClubID:string;
  ZoneID:string;
  ZoneName:string;
}

export interface mapLatLong {
  longitude:number; // 經度
  latitude:number; // 緯度
}
export interface mapAssetObject {
  name:string; //名稱	TRUE																				
  type:string; //		block,image,label,circle	物件類型	TRUE																				
  x:number; // x座標	TRUE																				
  y:number; // y座標	TRUE																				
  blockWidth?:number; // block寬	FALSE																				
  blockHeight?:number; // block高	FALSE																				
  blockColor?:string; //	block顏色	FALSE																				
  show:boolean; // 顯示與否	TRUE																				
  image:string; // 圖片	TRUE																				
  labelText?:string; // 標籤文字i18n key	FALSE																				
  labelFont?:string; // label字體(含大小)	FALSE																				
  labelIcon?:string; // label圖示	FALSE																				
  labelColor?:string; // label顏色	FALSE																				
  circleRadius?:number; //	circle起始半徑	FALSE																				
  circleColor?:string; // circle顏色	FALSE																				
  circleDashline?:boolean; // circle 虛線	FALSE																				
  circleGap?:number; // circle間距	FALSE																				
  circleMax?:number; // circle最多幾個	FALSE																				
}

export interface fairwayInfo {
  ClubID:string; // 球場/俱樂部代號																								
  ZoneID:string; // 區域代號																								
  FairwayID:string; // 球道代號																								
  No:number; // 球道序號																								
  yellowTee?:number; // 金發球台距果嶺距離																								
  blackTee?:number; // 黑發球台距果嶺距離																								
  blueTee?:number;	// 藍發球台距果嶺距離																								
  whiteTee?:number; // 白發球台距果嶺距離																								
  redTee?:number; // 紅發球台距果嶺距離																								
  Par:number; // 標準桿桿數																								
  handicap:number; //	差點																								
  fairwayMap?:string; // 球道圖資訊																								  
}