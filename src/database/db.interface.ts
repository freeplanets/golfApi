import { QueryResponse } from "nestjs-dynamoose";
import { HcpType, mapAssetObjectType, sideGameFormat, sideGameGroup, sideGames } from "../models/enum";
import { AnyObject } from "../models/if";
import { ConditionInitializer } from "dynamoose/dist/Condition";
import { CartStatus } from "../function/func.interface";

export interface defaultKey {
  siteid?: string;
  zoneid?: string;
  // fairwayno?: number;
  cartid?:string;
  courseid?:string;
  deviceid?:string;
  gameid?:string;
  modifyid?: string;
}
export interface defaultMethod<T extends K, K extends defaultKey> {
  create(data:T):Promise<T>;
  update(key:K, data:Partial<T>, cond?:Partial<T>):Promise<T>;
  findOne(key:K):Promise<T>;
  findAll():Promise<T[]>;
  query(key:Partial<T>|ConditionInitializer, field?:string[]):Promise<QueryResponse<T>>;
  // queryWithCondition(cond:ConditionInitializer, field?:string[]):Promise<QueryResponse<T>>;
  delete(key:K):Promise<void>;
}

//發球台
export interface teeObject {
  teeName:string;
  teeColor:string;
  slope?:number;
  rating?:number;
  distance?:number,
}

export interface mapLatLong {
  longitude:number; // 經度
  latitude:number; // 緯度
}
export interface mapAssetObject {
  name:string; //名稱	TRUE
  type:mapAssetObjectType; // block,image,label,circle	物件類型	TRUE
  show:boolean; // 顯示與否	TRUE
  x:number; // x座標	TRUE
  y:number; // y座標	TRUE
  width?:number; // block寬	FALSE
  height?:number; // block高	FALSE
  icon?:string; // label圖示
  color?:string; //	block顏色	FALSE
  bgColor?:string; // 底色
  borderColor?:string; // 邊框顏色
  font?:string; // label字體(含大小)	FALSE
  image:string; // 圖片	TRUE																				
  label?:string; // 標籤文字i18n key	FALSE																				
  circleRadius?:number; //	circle起始半徑	FALSE																				
  circleColor?:string; // circle顏色	FALSE																				
  circleDashline?:boolean; // circle 虛線	FALSE																				
  circleGap?:number; // circle間距	FALSE																				
  circleMax?:number; // circle最多幾個	FALSE																				
}

export interface mapObject {
  image:string; //檔案位置																								
  memo:string; //備註																								
  topLeft?:mapLatLong; //左上																								
  topRight?:mapLatLong; //右上																								
  bottomLeft?:mapLatLong; //左下																								
  bottomRight:mapLatLong; //右下																								
  assets:	mapAssetObject[]; //球道上物件
  width:number; //圖片寬度
  height:number; //圖片高度
  widthDistance:number; //寬度的距離長度(米)
  heading:number; //方向
}

export interface greenObject {
  sno:string;  //果嶺代號
  topEdge?:number; //距上邊界距離
  leftEdge?:number; //距左邊界距離
  rightEdge?:number; //距右邊界距離
  bottomEdge?:number; //距下邊界距離
  image:string;
  assets:mapAssetObject[]; //球道上物件
  width:number; //圖片寛度
  height:number; //圖片高度
  widthDistance:number; // 寛度的距離長度(米)
  enable:boolean;
  speed:number;
  memo?:string; //備註
}

export interface fairwayObject {
  fairwayno:number; // 球道代號/序號																							
  tees: teeObject[];
  par:number; // 標準桿桿數																								
  handicap:number; //	差點																								
  fairwayMap?:mapObject; // 球道圖資訊
  greens?:greenObject[]; // 果嶺資料
}

export interface zoneKey extends defaultKey {
  zoneid:string;
}

export interface zones extends zoneKey {
  siteid:string;
  name:string;
  holes:number;
  par:number;
  tees:teeObject[];
  fairways:fairwayObject[];
  refNo:number;
  modifyID?:string;
  modifyTime?:number;
}

export interface cartKey {
  cartid?: string;
  deviceid?:string;
}

export interface carts extends cartKey {
  cartName:string;
  siteid:string;
  zoneid?:string;
  fairwayno?:number;
  status:CartStatus;
  location?:mapLatLong;
  distance?:number;
  loctm?:number;
  deviceid?:string;
  deviceName?:string;
  deviceType?:string;
}

export interface cartHistory extends cartKey {
  carthistoryid:string;
  status?: string,
  location?: mapLatLong;
  ts:number;
}

export interface deviceKey {
  deviceid: string;
}

export interface deviceHistory extends deviceKey {
  historyid:string;
  location: mapLatLong;
  ts?:number;
}

export interface devices extends deviceKey {
  deviceName: string;
  deviceType: string;
  status: string;
  siteid: string;
  cartid?: string;
  location?: mapLatLong;
}


export interface score {
  holeNo:number;
  zoneid:string;
  fairwayno:number;
  handicap:number;
  par:number;
  gross: number;
  parDiff:number;
  extraInfo?:AnyObject;
}

export interface playerGameData {
  selected:boolean;
  playerName: string;
  hcp:string
  betterballGroup:sideGameGroup;
  points:number;
  playOrder:number;
  holes:score[];
  extraInfo?:AnyObject;
}

export interface sideGame {
  sidegameid:string;
  sideGameName:sideGames;
  format:sideGameFormat | null;
  wager:number;
  wagerMax?:number;
  carryOver?:boolean;
  hcpType: HcpType;
  playerGameData:playerGameData[];
  extraInfo?:AnyObject; 
}

export interface player {
  playerName: string;
  hcp: string;
  tee: teeObject;
  playerOrder:number;
  gross:number;
  frontGross:number;
  backGross:number;
  parDiff:number;
  stablefordPoint:number;
  holes: score[],
  extra?: AnyObject,
}
export interface playerDefault {
  playerName: string;
  tee?: string;
  fullHcp: string;
  allowance: string;
  hcp: string;
  hcpRound: boolean;  //從難洞算起或開始洞
  selected?:boolean;
  betterballGroup?:string;
  playOrder?:string;
}
export interface caddie {
  caddieid:string,
  caddieName?:string,
}

export interface gameKey {
  gameid:string;
}
export interface games extends gameKey {
  siteid:string;
  courseid:string;
  outZone:string;
  inZone:string;
  par:number;
  rating:number;
  slope:number;
  carts:string[];
  stepInZone:string;
  stepInFairway:number;
  esttimatedStartTime: number;
  startTime: number;
  endTime: number;
  players: player[];
  caddies: caddie[];
  playerDefaults: playerDefault[];
  sideGames:sideGame[];
  gameTitle?:string;
}

export interface courseKey extends defaultKey {
  courseid: string;
}

export interface courses extends courseKey {
  siteid:string;
  courseName:string;
  outZone:string;
  inZone?:string;
  holes:number;
  par:number;
  tees:teeObject[],
  slope?:number;
  rating?:number;
  courseType?:string;
  courseArchitect?:string;
  courseOpenDate?:string;
  openDate?:string;
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