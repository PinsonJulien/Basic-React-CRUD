import Post from "../../models/Post";
import ApiService from "./api.service";

export default class PostApiService extends ApiService {

  constructor() {
    super('/posts');
  }

  /**
   * Fetch all posts from the API.
   * 
   * @returns Promise<Post[]>
   */
  public getAll(): Promise<Post[]> {
    return this.get<Post[]>('', {});
  }

  /**
   * Create a new Post using the given body.
   * On success the created Post is returned.
   * 
   * @param body Post
   * @returns Promise<Post>
   */
  public create(body: Post): Promise<Post> {
    return this.post<Post>('', {}, body);
  }

  /**
   * Update a given Post. 
   * On success the updated Post is returned.
   * 
   * @param id number
   * @param body Partial<Post>
   * @returns Promise<Post>
   */
  public updateById(id: number, body: Partial<Post> = {}): Promise<Post> {
    return this.put<Post>(id, {}, body);
  }

  /**
   * Delete a given Post.
   * On success an empty body is returned.
   * 
   * @param id number
   * @returns Promise<void>
   */
  public deletebyId(id: number): Promise<void> {
    return this.delete<void>(id);
  }

}