import { AnyObject } from "src/models/if";

export interface defaultFunc {
	(args:any, F:Function):any;
}
export enum OperatorSign {
	bigger = '>',
	evenOrBigger = '>=',
	less = '<',
	evenOrLess = '<=',
	even = '=',
	in = 'in',
	between = 'between',
	exist = 'exist',
	notExist = '!exist',
}
export enum ConditionComparisonComparatorName {
	equals = "eq",
	notEquals = "ne",
	lessThan = "lt",
	lessThanEquals = "le",
	greaterThan = "gt",
	greaterThanEquals = "ge",
	beginsWith = "beginsWith",
	contains = "contains",
	exists = "exists",
	in = "in",
	between = "between"
}
export enum CartStatus {
	idle = 'idle',
	onduty = 'onduty',
	maintance = 'maintance',
}
export enum DeviceStatus {
	idle = 'idle',
	onduty = 'onduty',
	maintance = 'maintance',
}
export interface oneOfType {
	oneOf: string | number | boolean;
}

export interface filterObj {
	key: string;
	op: OperatorSign;
	values: oneOfType[];
}

export interface queryReq {
	queryKey: string;
	queryType: string;
	items?:oneOfType[];
	filters?:filterObj[];
	anyFilters?:filterObj[];
}

export interface scoreLine {
	f0:string;
	f1:string;
	f2?:string;
	f3?:string;
	f4?:string;
	f5?:string;
	f6?:string;
	f7?:string;
	f8?:string;
	f9?:string;
}
export interface scoresData {
	gameid:string;
	front?: scoreLine[];
	back?: scoreLine[];
	total?: scoreLine[];
}

export interface sideGameRes {
	sideGameTitle: scoreLine;
	sideGameScore: scoreLine[];
	sideGameTotal: scoreLine;
}