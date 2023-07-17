import { QueryResponse } from "nestjs-dynamoose";
import { HcpType, mapObjectType, sideGames } from "../models/enum";
import { AnyObject } from "../models/if";

export interface defaultKey {
  id: string;
  clubid?: string;
  ModifyID?: string;
}
export interface defaultMethod<T,K> {
  create(data:T):Promise<T>;
  update(key:K, data:Partial<T>):Promise<T>;
  findOne(key:K):Promise<T>;
  findAll():Promise<T[]>;
  query(key:Partial<T>):Promise<QueryResponse<T>>;
  delete(key:K):Promise<void>;
}

export default interface Club extends defaultKey {
	//id 球場代號
	name:string,	// 球場名稱
	membership?:string, // 會員型態
	numberOfHoles?:number, // 總洞數
	address?:string, // 地址
	city?:string, // 所在鄉鎮市
	state?:string, // 所在城市/州(省)
	country?:string, // 國家
	postalCode?:string, // 郵遞區號
	phone?:string,	// 電話
	website?:string, // 首頁網址
}

export interface Zone extends defaultKey {
  zoneid: string;
  clubid: string;
  name:string;
  Par?:number;
  modifyID?:string;
  modifyTiime?:number;
}

export interface greenObject {
  sno:string;  //果嶺代號
  topEdge:number; //距上邊界距離
  leftEdge:number; //距左邊界距離
  rightEdge:number; //距右邊界距離
  bottomEdge:number; //距下邊界距離
}
export interface mapLatLong {
  longitude:number; // 經度
  latitude:number; // 緯度
}
export interface mapAssetObject {
  name:string; //名稱	TRUE																				
  type:mapObjectType; //		block,image,label,circle	物件類型	TRUE																				
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
export interface mapObject {
  src:string; //檔案位置																								
  memo:string; //備註																								
  topLeft:mapLatLong; //左上																								
  topRight:mapLatLong; //右上																								
  bottomLeft:mapLatLong; //左下																								
  bottomRight:mapLatLong; //右下																								
  assets:	mapAssetObject[]; //球道上物件																								
}
export interface fairwayInfo extends defaultKey {
  clubid:string; // 球場/俱樂部代號																								
  zoneid:string; // 區域代號																								
  fairwayid:number; // 球道代號/序號																							
  yellowTee?:number; // 金發球台距果嶺距離																								
  blackTee?:number; // 黑發球台距果嶺距離																								
  blueTee?:number;	// 藍發球台距果嶺距離																								
  whiteTee?:number; // 白發球台距果嶺距離																								
  redTee?:number; // 紅發球台距果嶺距離																								
  Par:number; // 標準桿桿數																								
  handicap:number; //	差點																								
  fairwayMap?:mapObject; // 球道圖資訊
  greens?:greenObject[]; // 果嶺資料
  modifyID?:string; //修改人員代號
}
export interface carPosition {
  groupid: string,
  clubid: string;
  zoneid: string;
  fairwayid: number;
  carid: number;
  position: mapLatLong;
}
export interface carPositionHistory {
  groupid: string,
  clubid: string;
  zoneid: string;
  fairwayid: number;
  carid: number;
  position: mapLatLong;
  tm:number,
}
export interface stepIn {
  zoneid:string;
  fairwayid:number;
}
export interface playScore {
  playerid:string;
  gross:number;
  SwingOrder?:number;
}
export interface holeScore {
  zoneid:string;
  fairwayid:number;
  scores: playScore[],
  PlayOrder:number,  
}
export interface holeScoreWithInfo extends holeScore {
  Par:number;
  Handicap:number;
}
export interface endScore {
  gross: number,
  holes: holeScoreWithInfo[],
}

export interface score extends playScore {
  zoneid:string;
  fairwayid:number;
}

export interface sideGameHcp {
  playerid:string;
  handicap:number;
}

export interface sideGame {
  name:sideGames; 
  //NoHcp:boolean;
  //FullHcp:boolean;
  //HcpDiff:boolean;
  HcpType: HcpType;
  Hcps:sideGameHcp[];
  scores:endScore;
}

export interface sideGamesData {
  GroupID:string;
  sideGames: sideGame[],
}
export interface gameZones {
  out:string;
  in:string;
}
export interface client {
  ID:string;
  checkInID:string;
  name:string;
  swingOrder?:number;
}
export interface checkInData extends sideGamesData{
  ClubID:string;
  // GroupID:string;
  CarrieID?:string;
  CarID?:string;
  zones:gameZones;
  players:client[];
  start:stepIn;
  scores: endScore;
  // sideGames: sideGame[];
  position?:mapLatLong;
  inTimestamp?:number;
}

export interface swingResult {
  GroupID:string,
  scores: holeScore[],
}

export interface partialResult {
  GroupID: string,
  scores: endScore,
  sideGameScores: endScore,
}

export interface platformUser extends AnyObject {
  // lastip: '1.34.195.217',
  siteid: string; // 'linkougolf',
  // lastlogintm: 1689229706766,
  // meta: { nickname: 'admin001' },
  // profile: {},
  // createdAt: '2023-07-13T06:08:37.735Z',
  // enable2FA: false,
  group: string; // 'admin',
  uid: string; // '3ZBJab1PfGd9kdkw5PmnqE',
  active: true,
  // updatedAt: '2023-07-13T06:28:26.766Z',
  // username: 'admin001',
  // need2fa: false,
  // iat: 1689230132,
  // exp: 1689237332,
  // iss: 'api.novaapps.net'
}

/*
export interface ItemObjectFromSchemaSettings {
  type: "toDynamo" | "fromDynamo";
  schema?: Schema;
  checkExpiredItem?: boolean;
  saveUnknown?: boolean;
  defaults?: boolean;
  forceDefault?: boolean;
  customTypesDynamo?: boolean;
  validate?: boolean;
  required?: boolean | "nested";
  enum?: boolean;
  populate?: boolean;
  combine?: boolean;
  modifiers?: ("set" | "get")[];
  updateTimestamps?: boolean | {
      updatedAt?: boolean;
      createdAt?: boolean;
  };
  typeCheck?: boolean;
  mapAttributes?: boolean;
}
*/
