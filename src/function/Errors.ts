import { ErrMsg } from "../models/enumError";

export function errorMsg(code:string, key?:string) {
	let msg = String(ErrMsg[code]);
	if (key) {
		const fIdx = msg.indexOf('%');
		if (fIdx> -1) {
			msg = msg.replace('%s', key);
		}
	}
	return msg;
}