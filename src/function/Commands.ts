import { carPositionHistory, defaultKey, defaultMethod, platformUser } from "../database/db.interface";
import { ErrCode } from "../models/enumError";
import { commonRes, commonResWithData } from "../models/if";
import { errorMsg } from "./Errors";
import {v4 as uuidv4} from 'uuid';
import { JwtService } from "@nestjs/jwt";
import CarPositionService from "src/database/carPosition/CarPosition.service";

const jwt = new JwtService();
const pfSite = 'union';
const pfSiteDev = 'union-dev';

export function hashKey() {
	return uuidv4();
}

export function tokenCheck(token:string): platformUser | false {
	const user = jwt.decode(token) as platformUser;
	// console.log('tokenCheck:', user);
	if (user.active) return user;
	return false;
}
export async function FuncWithTockenCheck<D extends defaultKey>(token:string, F:Function) {
	let resp:commonResWithData<D> = {
		errcode: '0',		
	}	
	const user = tokenCheck(token);
	if (user) {
		resp = await F()
	} else {
		resp.errcode = ErrCode.TOKEN_ERROR,
		resp.error = {
			message: errorMsg('TOKEN_ERROR'),
		}		
	}
	return resp;
}
export async function getCarTrack(token:string, service:CarPositionService, clubid:string, carid:string){
	let resp:commonResWithData<carPositionHistory[]> = {
		errcode: '0',		
	}	
	const user = tokenCheck(token);
	if (user) {
		try {
			const key:Partial<carPositionHistory> = {
				clubid: clubid,
				carid: Number(carid),
			}
			console.log('getCarTrack:', key);
			resp.data = await service.queryHistory(key);
		} catch(e) {
			resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
			resp.error = {
				message: errorMsg('DATABASE_ACCESS_ERROR'),
				extra: e,
			}
		}
	} else {
		resp.errcode = ErrCode.TOKEN_ERROR,
		resp.error = {
			message: errorMsg('TOKEN_ERROR'),
		}		
	}
	return resp;	
}

export async function deleteTableData<D extends defaultKey>(token:string, dbservice:any, id:string) {
	let resp:commonRes = {
		errcode: '0',		
	}	
	if (id) {
		const user = tokenCheck(token);
		if (user) {
			const service = dbservice as defaultMethod<D, defaultKey>;
			try {
				const searchKey:defaultKey = {
					id: id,
				}
				const f = await service.findOne(searchKey);
				if (f) {
					if (isMyClub(user, f.clubid)) {
						await service.delete(searchKey);
					} else {
						resp.errcode = ErrCode.ERROR_PARAMETER;
						resp.error = {
							message: errorMsg('ERROR_PARAMETER', 'clubid'),
						}					
					}
				} else {
					resp.errcode = ErrCode.ITEM_NOT_FOUND;
					resp.error = {
						message: errorMsg('ITEM_NOT_FOUND'),
					}
				}	
			} catch(e) {
				resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
				resp.error = {
					message: errorMsg('DATABASE_ACCESS_ERROR'),
					extra: e,
				}
			}
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR,
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}		
		}
	} else {
		resp.errcode = ErrCode.MISS_PARAMETER;
		resp.error = {
			message: errorMsg('MISS_PARAMETER', 'id'),
		}
	}
	return resp;	
}
export async function queryTable<D extends defaultKey>(token:string, dbservice:any, key: Partial<D>, addClubid = false) {
	let resp:commonResWithData<D[]> = {
		errcode: '0',		
	}	
	const user = tokenCheck(token);
	if (user) {
		const service  = (dbservice as defaultMethod<D, defaultKey>);
		try {
			if (addClubid) key.clubid = user.siteid;
			resp.data = await service.query(key);
		} catch(e) {
			resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
			resp.error = {
				message: errorMsg('DATABASE_ACCESS_ERROR'),
				extra: e,
			}
		}
	} else {
		resp.errcode = ErrCode.TOKEN_ERROR,
		resp.error = {
			message: errorMsg('TOKEN_ERROR'),
		}		
	}
	return resp;
}
export async function modifyTableData<D extends defaultKey>(token:string, dbservice:any, data:D):Promise<commonResWithData<D>> {
	const resp:commonResWithData<D> = {
		errcode: '0',		
	}
	const user = tokenCheck(token);
	if (user) {
		data.ModifyID = user.uid;
		const service = (dbservice as defaultMethod<D, defaultKey>);
		try {
			let key:defaultKey;
			if (data.id) {
				key = {
					id: data.id,
				}
				delete data.id;
				const f = await service.findOne(key);
				if (f) {
					// 更改資料時檢查是否為同球場
					if (isMyClub(user, f.clubid)) {
						resp.data = await service.update(key, data);
					} else { 
						resp.errcode = ErrCode.ERROR_PARAMETER;
						resp.error = {
							message: errorMsg('ERROR_PARAMETER', 'clubid'),
						}
					}
				} else {
					resp.errcode = ErrCode.ITEM_NOT_FOUND;
					resp.error = {
						message: errorMsg('ITEM_NOT_FOUND'),
					}
				}				
			} else {
				data.id = hashKey();
				resp.data = await service.create(data);
			}
		} catch (e) {
			resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
			resp.error = {
				message: errorMsg('DATABASE_ACCESS_ERROR'),
				extra: e,				 
			}
			console.log(e);
		}
	} else {
		resp.errcode = ErrCode.TOKEN_ERROR,
		resp.error = {
			message: errorMsg('TOKEN_ERROR'),
		}
	}
	return resp;
}

export function isMyClub(user:platformUser, clubid:string):boolean {
	let ans = false;
	if (user.siteid === clubid ) {
		return true;
	} else if (user.siteid === pfSiteDev || user.siteid === pfSite) {
		return true;
	}
	return ans;
}
