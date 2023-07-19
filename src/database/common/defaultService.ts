import { Model, QueryResponse } from "nestjs-dynamoose";
import { defaultMethod } from "../db.interface";

export default abstract class defaultService<T extends K, K> implements defaultMethod<T, K> {
	constructor(protected model:Model<T, K>){}
	create(data: T): Promise<T> {
		return this.model.create(data);
	}
	update(key: K, data: Partial<T>): Promise<T> {
		return this.model.update(key, data);
	}
	findOne(key: K): Promise<T> {
		return this.model.get(key);
	}
	findAll(): Promise<T[]> {
		return this.model.scan().exec();
	}
	query(key: Partial<K>): Promise<QueryResponse<T>> {
		return this.model.query(key).exec();
	}
	delete(key:K): Promise<void> {
		return this.model.delete(key);
	}
}