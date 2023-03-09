import Post from "../../models/Post";
import ApiService from "./api.service";

export default class PostApiService extends ApiService {

  constructor() {
    super('posts');
  }

  /**
   * Fetch all posts from the API.
   * 
   * @returns Promise<Post[]>
   */
  public async getAll(): Promise<Post[]> {
    return this.get<Post[]>('', {})
      .then((arr: Array<Post>) => arr.map((post: Post) => new Post(post)));
  }

  /**
   * Fetch a post from the API by the given ID.
   * 
   * @returns Promise<Post>
   */
  public async getById(id: number): Promise<Post> {
    return this.get<Post>(id, {})
      .then((post: Post) => new Post(post));
  }

  /**
   * Create a new Post using the given body.
   * On success the created Post is returned.
   * 
   * @param body Partial<Post>
   * @returns Promise<Post>
   */
  public async create(body: Partial<Post>): Promise<Post> {
    return this.post<Post>('', {}, body)
      .then((post: Post) => new Post(post));
  }

  /**
   * Update a given Post. 
   * On success the updated Post is returned.
   * 
   * @param id number
   * @param body Partial<Post>
   * @returns Promise<Post>
   */
  public async updateById(id: number, body: Partial<Post> = {}): Promise<Post> {
    return this.patch<Post>(id, {}, body)
      .then((post: Post) => new Post(post));
  }

  /**
   * Delete a given Post.
   * On success an empty body is returned.
   * 
   * @param id number
   * @returns Promise<void>
   */
  public async deletebyId(id: number): Promise<void> {
    return this.delete<void>(id);
  }

}