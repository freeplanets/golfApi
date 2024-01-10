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

export interface ksGameNew {
  key: string;  //"key": "F8FTwpKuMD3IIeMXH4Tn8Nc2ukKVl21q",
  group_no: string; //"group_no": "26",
  areas: string[]; //"areas": ["東", "南"],
  caddie: string[]; //"caddie": ["001", "002"],
  player: string[]; //"player": ["丁大＊", "于祖＊", "大平＊", "土田＊"],
  player_id: string[]; //"player_id": ["1001", "1002", "1003", "1004"],
  team: string; //"team": "吉祥球隊",
  team_id: string;  //"team_id": "1201"
}

export interface AreaScore {
  area:string;
  score1:number;
  score2:number;
  score3:number;
  score4:number;
  score5:number;
  score6:number;
  score7:number;
  score8:number;
  score9:number;
  total:number;
}
export interface PlayScoreData {
  player_id: string;
  player_name: string;
  team_id: string;
  team:string;
  start_time:string;  //"2021-03-04 05:46:31",
  end_time:string;  //"2021-03-04 07:40:01",
  cart:string;
  caddie:string[];
  area_score:AreaScore[];
}
export interface PlayScores {
  success: boolean;
  v:string; //"1.3",
  code:number; //1000,
  message: string; //"Success, Access Type : JSON.",
  data: PlayScoreData[];
}