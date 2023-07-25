import { Model, QueryResponse } from "nestjs-dynamoose";
import { defaultKey, defaultMethod } from "../db.interface";
import { Condition } from "dynamoose";

export default abstract class defaultService<T extends K, K extends defaultKey> implements defaultMethod<T, K> {
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
	query(key: Partial<T>): Promise<QueryResponse<T>> {
		return this.model.query(key).exec();
	}
	delete(key:K): Promise<void> {
		return this.model.delete(key);
	}
}