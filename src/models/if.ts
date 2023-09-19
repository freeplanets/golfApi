import { carts, games, mapLatLong, zones } from "../database/db.interface";

export interface AnyObject {
  modifyid?:string;
  memberid?:string;
  checkInId?:string;
  [key:string]: any;
}

export interface errObj {
  message: string;
  extra?: AnyObject;
}

export interface commonRes {
  errcode:string;
  error?:errObj;
}

export interface commonResWithData<D> extends commonRes {
  data?:D;
}

// for game search
export default interface siteDateReq {
  siteid: string,
  queryDate: string,
}

export interface positonReq {
  // cartid:string; // 球車代號	TRUE
  zoneid?:string; // 分區代號
  fairwayno:number; //球道代號	TRUE
  location:mapLatLong; // 經緯度物件	TRUE																				
  distance?:number; // 離發球區距離
  cartName?:string; // for response
}

export interface checkInRes {
	game: games,
	zones: zones[],
	cart: carts,
}

export interface locReq extends mapLatLong {
  zoneid?:string;
  fairwayno?:number;
  distance?:number;
  siteid?:string;
}
