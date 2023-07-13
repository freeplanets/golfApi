export enum ErrCode {
	OK = '0',
	MISS_PARAMETER = '1',
	DATABASE_ACCESS_ERROR = '2',
	TOKEN_ERROR = '3'
}
export enum ErrMsg {
	OK = 'OK',
	MISS_PARAMETER = 'missing parameter %s',
	DATABASE_ACCESS_ERROR = 'database access error',
	TOKEN_ERROR = 'Token error!',
}