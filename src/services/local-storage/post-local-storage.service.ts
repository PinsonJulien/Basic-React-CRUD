import LocalStorageService from "./local-storage.service";

export default class PostLocalStorageService extends LocalStorageService {

  constructor() {
    super('posts');
  }

  

}