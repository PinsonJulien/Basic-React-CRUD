import ApiService from "./api.service";

export default class PostApiService extends ApiService {

  constructor() {
    super('/posts');
  }

  public getAll() {
    return this.get('', {});
  }

  public getById(id: number) {
    return this.get(id, {});
  }

  public updateById(id: number, body: Object = {}) {
    return this.put(id, {}, body);
  }

  public deletebyId(id: number) {
    return this.delete(id);
  }

}