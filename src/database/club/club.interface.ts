import { defaultKey } from "../db.interface"; 

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