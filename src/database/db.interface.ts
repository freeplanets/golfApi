import { AnyObject } from "src/models/if";

export interface defaultKey {
  id: string,
}
export interface defaultMethod<T,K> {
  create(data:T):Promise<T>;
  update(key:K, data:Partial<T>):Promise<T>;
  findOne(key:K):Promise<T>;
  findAll():Promise<T[]>;
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
  clubid: string;
  name:string;
  Par?:number;
  modifyID?:string;
  modifyTiime?:number;
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
