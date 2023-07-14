import { defaultKey, defaultMethod, platformUser } from "../database/db.interface";
import { ErrCode } from "../models/enumError";
import { commonResWithData } from "../models/if";
import { errorMsg } from "./Errors";
import {v4 as uuidv4} from 'uuid';
import { JwtService } from "@nestjs/jwt";

const jwt = new JwtService();

export function hashKey() {
	return uuidv4();
}

export function tokenCheck(token:string): platformUser | false {
	const user = jwt.decode(token) as platformUser;
	// console.log('tokenCheck:', user);
	if (user.active) return user;
	return false;
}
export async function modifyTableData<D extends defaultKey>(dbservice:any, data:D):Promise<commonResWithData<D>> {
	console.log('modifyTableData', data);
	const resp:commonResWithData<D> = {
		errcode: '0',		
	}
	const service = (dbservice as defaultMethod<D, defaultKey>);
	try {
		let key:defaultKey;
		if (data.id) {
			key.id = data.id
			delete data.id;
			resp.data = await service.update(key, data);
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
	return resp;
}