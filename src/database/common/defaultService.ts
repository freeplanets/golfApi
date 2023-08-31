import { Model, QueryResponse } from "nestjs-dynamoose";
import { defaultKey, defaultMethod } from "../db.interface";
import { Condition } from "dynamoose";
import { ConditionInitializer } from "dynamoose/dist/Condition";

export default class defaultService<T extends K, K extends defaultKey> implements defaultMethod<T, K> {
	constructor(protected model:Model<T, K>){}
	create(data: T): Promise<T> {
		return this.model.create(data);
	}
	update(key: K, data: Partial<T>, cond?: Partial<T>): Promise<T> {
		if (cond) {
			const condition = new Condition(cond).eq(true);
			return this.model.update(key, data, { return: 'item', condition: condition});
		}
		return this.model.update(key, data);
	}
	/*
	update(key: K, data: Partial<T>): Promise<T> {
		return this.model.update(key, data);
	}
	*/
	findOne(key: K): Promise<T> {
		return this.model.get(key);
	}
	findAll(): Promise<T[]> {
		return this.model.scan().exec();
	}
	query(key: Partial<T> | ConditionInitializer, field?:string[], index:string=''): Promise<QueryResponse<T>> {
		 const query = this.model.query(key);
		 if (field && field.length > 0) query.attributes(field);
		 if (index) {
			query.using(index);
		 }
		 return query.exec();
	}
	delete(key:K): Promise<void> {
		return this.model.delete(key);
	}
	/*
	queryWithCondition(cond:ConditionInitializer, field?:string[]):Promise<QueryResponse<T>>{
		const query = this.model.query(cond);
		if (field && field.length > 0) {
			query.attributes(field);
		}
		return query.exec();
	}
	*/
	getModel() {
		return this.model;
	}
}