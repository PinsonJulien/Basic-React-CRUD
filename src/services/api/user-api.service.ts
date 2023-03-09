import User from "../../models/User";
import ApiService from "./api.service";

export default class UserApiService extends ApiService {

  constructor() {
    super('users');
  }

  /**
   * Fetch all users from the API.
   * 
   * @returns Promise<User[]>
   */
  public getAll(): Promise<User[]> {
    return this.get<User[]>('', {})
      .then((arr: Array<User>) => arr.map((user: User) => new User(user)));
  }

}