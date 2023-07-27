import { defaultKey, defaultMethod, platformUser } from "../database/db.interface";
import { ErrCode } from "../models/enumError";
import { commonRes, commonResWithData } from "../models/if";
import { errorMsg } from "./Errors";
// import {v4 as uuidv4} from 'uuid';
import { JwtService } from "@nestjs/jwt";


const jwt = new JwtService();
const pfSite = 'union';
const pfSiteDev = 'union-dev';
const uuid62 = require('uuid62');

export function hashKey() {
	return uuid62.v4() as string;
}

export function tokenCheck(token:string): platformUser | false {
	const user = jwt.decode(token) as platformUser;
	// console.log('tokenCheck:', user);
	if (user && user.active) return user;
	return false;
}
export async function FuncWithTockenCheck<D>(token:string, P:Promise<D>) {
	let resp:commonResWithData<D> = {
		errcode: '0',		
	}	
	if (tokenCheck(token)) {
		resp = await P.then();
	} else {
		resp.errcode = ErrCode.TOKEN_ERROR,
		resp.error = {
			message: errorMsg('TOKEN_ERROR'),
		}		
	}
	return resp;
}
export async function deleteTableData<D extends defaultKey>(token:string, dbservice:any, keys:defaultKey) {
	let resp:commonRes = {
		errcode: '0',		
	}	
	if (keys) {
		const user = tokenCheck(token);
		if (user) {
			const service = dbservice as defaultMethod<D, defaultKey>;
			try {
				const f = await service.findOne(keys);
				if (f) {
					if (isMyClub(user, f.siteid)) {
						await service.delete(keys);
					} else {
						resp.errcode = ErrCode.ERROR_PARAMETER;
						resp.error = {
							message: errorMsg('ERROR_PARAMETER', 'siteid'),
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
export async function queryTable<D extends K, K>(token:string, dbservice:any, key: Partial<D>) {
	let resp:commonResWithData<D[]> = {
		errcode: '0',		
	}	
	const user = tokenCheck(token);
	if (user) {
		const service  = (dbservice as defaultMethod<D, K>);
		try {
			// if (addClubid) key.siteid = user.siteid;
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
export async function getTableData<D extends K, K extends defaultKey>(token:string, dbservice:any, keys:K):Promise<commonResWithData<D>> {
	const resp:commonResWithData<D> = {
		errcode: '0',		
	}
	const user = tokenCheck(token);
	if (user) {
		const service = (dbservice as defaultMethod<D, K>);
		try {
			console.log('findkey', keys);
			const f = await service.findOne(keys);
			if (f) {
				// 更改資料時檢查是否為同球場
					resp.data = f;
			} else {
				resp.errcode = ErrCode.ITEM_NOT_FOUND;
				resp.error = {
					message: errorMsg('ITEM_NOT_FOUND'),
				}
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
export async function updateTableData<D extends K, K extends defaultKey>(token:string, dbservice:any, data:Partial<D>, keys:K, filter?:Partial<D>):Promise<commonResWithData<D>> {
	const resp:commonResWithData<D> = {
		errcode: '0',		
	}
	const user = tokenCheck(token);
	if (user) {
		data.modifyid = user.uid;
		const service = (dbservice as defaultMethod<D, K>);
		try {
			console.log('findkey', keys);
			const f = await service.findOne(keys);
			if (f) {
				// 更改資料時檢查是否為同球場
				if (isMyClub(user, f.siteid)) {
					resp.data = await service.update(keys, data, filter);
				} else { 
					resp.errcode = ErrCode.ERROR_PARAMETER;
					resp.error = {
						message: errorMsg('ERROR_PARAMETER', 'siteid'),
					}
				}
			} else {
				resp.errcode = ErrCode.ITEM_NOT_FOUND;
				resp.error = {
					message: errorMsg('ITEM_NOT_FOUND'),
				}
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

export async function createTableData<D extends K, K extends defaultKey>(token:string, dbservice:any, data:D):Promise<commonResWithData<D>> {
	const resp:commonResWithData<D> = {
		errcode: '0',		
	}
	const user = tokenCheck(token);
	if (user) {
		data.modifyid = user.uid;
		const service = (dbservice as defaultMethod<D, K>);
		try {
			if (data.siteid){
				resp.data = await service.create(data);
			} else { 
				resp.errcode = ErrCode.ERROR_PARAMETER;
				resp.error = {
					message: errorMsg('ERROR_PARAMETER', 'siteid'),
				}
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

export function isMyClub(user:platformUser, siteid:string):boolean {
	let ans = false;
	if (user.siteid === siteid ) {
		return true;
	} else if (user.siteid === pfSiteDev || user.siteid === pfSite) {
		return true;
	}
	return ans;
}