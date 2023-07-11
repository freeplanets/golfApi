export interface defaultKey {
  id: string,
}
export interface dbDefaultMethod<T,K> {
  create(data:T):Promise<T>;
  update(key:K, data:T):Promise<T>;
  findOne(key:K):Promise<T>;
  findAll():Promise<T[]>;
}