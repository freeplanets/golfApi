import { AnyObject } from "../../../models/if";

export interface ksCaddie {
  number: string;
}

export interface ksZoneReq {
  number: number;
}

export interface ksTee {
  name: string;
}

export interface ksExtra extends AnyObject{
  memberId: string;
  checkInId: string;
}

export interface ksPlayer {
  name:string;
  tee: ksTee;
  extra: ksExtra;
}

export interface ksEvent {
  name: string;
}

export interface ksGameReq {
  caddie: ksCaddie;
  caddie2?: ksCaddie;
	zones: ksZoneReq[];
	players: ksPlayer[];
	teeOffTimestamp: number;
  event?: ksEvent;
}

export interface ksLang {
  _default:string;  //預設語言
  zhTW?:string;  // 䌓中
  jaJP?:string;  // 日文
  koKR?:string; // 韓文
  zhCN?:string; // 簡中
}

export interface ksZone {
  id:string;
  name: ksLang;
}

export interface ksHole {
  id:string; // 球洞代號
  number:number; // 序號
  name:ksLang; // 名稱
  handicap:number; // HCP
  par:number; //標準桿
  standardTime?:number; // 標準擊球時間
  _type?:string; // simple_hole	球道難易類型																					  
}

export interface ksScore {
  player:ksPlayer; // 球員資料
  shots:number[]; // 擊球成績
}

export interface ksGame {
  zones: ksZone[];
  holes: ksHole[];
  startDateTime: number;
  scores: ksScore[];
}