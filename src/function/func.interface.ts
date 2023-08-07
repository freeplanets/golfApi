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