import { defaultKey, defaultMethod, gameKey, platformUser, player, playerDefault } from "../database/db.interface";
import { ErrCode } from "../models/enumError";
import { AnyObject, commonRes, commonResWithData } from "../models/if";
import { errorMsg } from "./Errors";
// import {v4 as uuidv4} from 'uuid';
import { JwtService } from "@nestjs/jwt";
import { ConditionComparisonComparatorName, queryReq, scoreLine, scoresData } from "./func.interface";
import { Condition } from "dynamoose";
import _scoreObject from "../models/game/_scoreObject";
import GamesService from "../database/game/games.service";

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
		errcode: ErrCode.OK,		
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
		errcode: ErrCode.OK,		
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
export async function queryTable<D extends K, K>(token:string, dbservice:any, key: Partial<D> | queryReq) {
	console.log('queryTable:', key);
	let resp:commonResWithData<D[]> = {
		errcode: ErrCode.OK,		
	}	
	const user = tokenCheck(token);
	if (user) {
		const service  = (dbservice as defaultMethod<D, K>);
		try {
			// if (addClubid) key.siteid = user.siteid;
			if ((key as queryReq).queryKey) {
				const cond = createCondition(key as queryReq);
				resp.data = await service.query(cond);
			} else {
				resp.data = await service.query(key as Partial<D>);
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
	return resp;
}
export async function getTableData<D extends K, K extends defaultKey>(token:string, dbservice:any, keys:K):Promise<commonResWithData<D>> {
	const resp:commonResWithData<D> = {
		errcode: ErrCode.OK,		
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
		errcode: ErrCode.OK,		
	}
	const user = tokenCheck(token);
	if (user) {
		console.log('updateTableData:')
		// console.dir(data, {	depth: 8 });
		data.modifyid = user.uid;
		const service = (dbservice as defaultMethod<D, K>);
		try {
			console.log('findkey', keys);
			const f = await service.findOne(keys);
			if (f) {
				// 更改資料時檢查是否為同球場
				if (isMyClub(user, f.siteid)) {
					data = removeUnderLineData(data);
					// console.log('removeUnderLineData:', JSON.stringify(data));
					// console.log('service:', service);
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
		errcode: ErrCode.OK,		
	}
	const user = tokenCheck(token);
	if (user) {
		console.log('createTableData:', data);
		data.modifyid = user.uid;
		const service = (dbservice as defaultMethod<D, K>);
		try {
			if (data.siteid){
				data = removeUnderLineData(data);
				console.log('createTableData:', data)
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

export function createCondition(dta:queryReq){
	const cond = new Condition().filter(dta.queryKey);
	switch(dta.queryType){
		case ConditionComparisonComparatorName.equals:
			cond.eq(dta.items[0]);
			break;
		case ConditionComparisonComparatorName.notEquals:
			cond.not().eq(dta.items[0]);
			break;
		case ConditionComparisonComparatorName.lessThan:
			cond.lt(dta.items[0]);
			break;
		case ConditionComparisonComparatorName.lessThanEquals:
			cond.le(dta.items[0]);
			break;
		case ConditionComparisonComparatorName.greaterThan:
			cond.gt(dta.items[0]);
			break;
		case ConditionComparisonComparatorName.greaterThanEquals:
			cond.ge(dta.items[0]);
			break;
		case ConditionComparisonComparatorName.beginsWith:
			cond.beginsWith(dta.items[0]);
			break;
		case ConditionComparisonComparatorName.contains:
			cond.contains(dta.items[0]);
			break;
		case ConditionComparisonComparatorName.exists:
			cond.exists();
			break;
		case ConditionComparisonComparatorName.in:
			cond.in(dta.items);
			break;
		case ConditionComparisonComparatorName.between:
			cond.between(dta.items);
			break;
	}
	return cond;
}

export function removeUnderLineData(dta:any) {
	// console.log(dta);
	if (typeof dta !== 'object') {
		return dta;
	}
	const a:AnyObject = {};
	Object.keys(dta).forEach((key) => {
		// console.log('key:', key);
		if (key.indexOf('_') === -1 && isAllowedData(dta[key])) {
			if (typeof dta[key] === 'object') {
				if (Array.isArray(dta[key]) ) {
					a[key] = dta[key].map((itm:any) => removeUnderLineData(itm))
					// console.log('check:', key, a[key]);
				} else {
					a[key] = removeUnderLineData(dta[key]);
				}
			} else {
				a[key] = dta[key];
			}
		}
	});
	return a;
}

export function playerDefaultHcpCal(data:playerDefault[]){
	return data.map((pd) => {
		const hcp = parseInt(pd.fullHcp.replace('+', '-'), 10);
		const allowance = parseInt(pd.allowance, 10)
		pd.hcp = `${Math.round(hcp * allowance/100)}`;
		return pd;
	})
}
export async function getResultByGameID(token:string, gameid:string, dbservice:GamesService) {
	const resp:commonResWithData<scoresData> = {
		errcode: ErrCode.OK,
	} 
	if (tokenCheck(token)) {
		const f = await dbservice.query({gameid}, ['players']);
		if (f.count > 0) {
			resp.data = createScoreData(gameid, f[0].players);
		} else {
			resp.errcode = ErrCode.ITEM_NOT_FOUND;
			resp.error = {
				message: errorMsg('ITEM_NOT_FOUND'),
			}
		}
	} else {
		resp.errcode = ErrCode.TOKEN_ERROR;
		resp.error = {
			message: errorMsg('TOKEN_ERROR'),
		}
	}
	return resp;
}
export function createScoreData(gameid:string, players:player[]) {
	const data:scoresData = {
		gameid,
		front:[],
		back:[],
		total:[],
	}
	players.forEach((player) => {
		data.total.push(createLineData([player.playerName, convString(player.frontGross), convString(player.backGross), convString(player.gross), convString(player.parDiff, true)]));
		player.holes.forEach((hole) => {
			if (hole.holeNo < 10) {
				assignLineData(data.front, 'PAR', hole.fairwayno, hole.par);
				assignLineData(data.front, 'HDCP', hole.fairwayno, hole.handicap);
				assignLineData(data.front, player.playerName, hole.fairwayno, hole.gross);
			} else {
				assignLineData(data.back, 'PAR', hole.fairwayno, hole.par);
				assignLineData(data.back, 'HDCP', hole.fairwayno, hole.handicap);
				assignLineData(data.back, player.playerName, hole.fairwayno, hole.gross);				
			}
		})
	})
	return data;
}
function assignLineData(arr:scoreLine[], key:string, idx:number, value:number){
	const f = arr.find((itm) => itm.f0 === key);
	if (f) {
		f[`f${idx}`] = convString(value);
	} else {
		const tmp = createLineData([key]);
		tmp[`f${idx}`] = convString(value);
		arr.push(tmp);
	}
}
function createLineData(arr:string[]) {
	const tmp:scoreLine = {
		f0: '',
		f1: '',
	}
	arr.forEach((itm,idx) => {
		tmp[`f${idx}`] = itm ? itm : '';
	});
	return tmp;
}
function convString(n:number, withSign = false) {
	if (isNaN(n)) return '';
	if (n === 0) return '';
	if (n > 0 && withSign) return `+${n}`;
	return String(n);
}
function isAllowedData(data:any) {
	if (data === null) return false;
	if (data === undefined) return false;
	if (typeof(data) === 'number' &&  isNaN(data)) return false;
	return true;
}